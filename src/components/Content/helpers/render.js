// based on https://github.com/shawticus/facemesh-threejs

import * as THREE from 'three';
import * as facemesh from '@tensorflow-models/facemesh';
import * as tf from '@tensorflow/tfjs-core';

import { OBJLoader } from './OBJLoader';

const LANDMARKS_LENGTH = 468;

const marks = [];

let model;
let mask;
let bg;
let video;
let renderer;
let camera;
let container;
let scene;
let videoSprite;

function onWindowResize() {
    camera.aspect = video.videoWidth / video.videoHeight;
    camera.updateProjectionMatrix();

    if (window.innerWidth > window.innerHeight) {
        renderer.setSize(
            window.innerWidth,
            (window.innerWidth * video.videoHeight) / video.videoWidth
        );
    } else {
        renderer.setSize(
            (window.innerHeight * video.videoWidth) / video.videoHeight,
            window.innerHeight
        );
    }
}

function animate() {
    bg.needsUpdate = true;

    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}

async function renderPrediction() {
    const predictions = await model.estimateFaces(video);

    if (predictions.length > 0) {
        mask.visible = true;

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < predictions.length; i++) {
            const keypoints = predictions[i].scaledMesh;

            // eslint-disable-next-line no-plusplus
            for (let j = 0; j < keypoints.length; j++) {
                const [xj, yj, zj] = keypoints[j];

                if (mask) {
                    mask.geometry.vertices[j].set(-xj, -yj, -zj / 30);
                    mask.geometry.verticesNeedUpdate = true;
                }
            }
        }
    } else {
        mask.visible = false;
    }

    requestAnimationFrame(renderPrediction);
}

export function intializeThreejs({ maskColor }) {
    video = document.getElementById('video');
    container = document.getElementById('video-container');

    camera = new THREE.PerspectiveCamera(
        50,
        video.videoWidth / video.videoHeight,
        1,
        5000
    );

    camera.position.z = video.videoHeight;
    camera.position.x = -video.videoWidth / 2;
    camera.position.y = -video.videoHeight / 2;

    bg = new THREE.Texture(video);
    bg.minFilter = THREE.LinearFilter;

    videoSprite = new THREE.Sprite(
        new THREE.MeshBasicMaterial({
            map: bg,
            depthWrite: false,
            side: THREE.DoubleSide
        })
    );

    scene = new THREE.Scene();

    const ambientLight = new THREE.AmbientLight(0x101030);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    scene.add(videoSprite);
    videoSprite.center.set(0.5, 0.5);
    videoSprite.scale.set(-video.videoWidth, video.videoHeight, 1);
    videoSprite.position.copy(camera.position);
    videoSprite.position.z = 0;

    const geometry = new THREE.BoxGeometry(2, 2, 2);

    new OBJLoader().load(`${process.env.PUBLIC_URL}/mask.obj`, (obj) => {
        obj.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                mask = new THREE.Mesh(
                    child.geometry,
                    new THREE.MeshLambertMaterial({
                        side: THREE.FrontSide,
                        color: maskColor
                    })
                );

                mask.visible = false;

                scene.add(mask);
            }
        });
    });

    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < LANDMARKS_LENGTH; index++) {
        const element = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial());
        marks.push(element);
    }

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    if (window.innerWidth > window.innerHeight) {
        renderer.setSize(
            window.innerWidth,
            (window.innerWidth * video.videoHeight) / video.videoWidth
        );
    } else {
        renderer.setSize(
            (window.innerHeight * video.videoWidth) / video.videoHeight,
            window.innerHeight
        );
    }

    container.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize, false);

    animate();
}

export async function intializeEngine({ callback }) {
    await tf.setBackend('webgl');

    model = await facemesh.load({ maxFaces: 1 });

    renderPrediction();

    setTimeout(() => {
        callback();
    }, 1000);
}

export function changeMaskColor(color) {
    if (mask) {
        mask.material.color.set(color);
        mask.material.needsUpdate = true;
    }
}

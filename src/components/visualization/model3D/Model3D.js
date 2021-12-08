import React from "react";
import * as d3 from 'd3';
import Grid from '@mui/material/Grid';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
let scene, camera, r, spheres, controls, node_pos, loader;
function init() {
    scene = new THREE.Scene();
    // camera = new THREE.OrthographicCamera( window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 100 );
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000);
    const directionalLight = new THREE.DirectionalLight(0x00ff00, 0.7);
    scene.add(directionalLight);
    r = new THREE.WebGLRenderer({ antialias: true });
    r.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(r.domElement);
    camera.position.z = 4;
    //    const texture = new THREE.TextureLoader().load( "redmetal.jpg" );

    // const material = new THREE.MeshBasicMaterial({map:texture});
    // const loader = new STLLoader();
    // loader.load('C:\Users\Ashwin\OneDrive\Desktop\DBI\fmri-connectivity-toolbox\src\Cube_3d_printing_sample.stl', function (geometry) {

    //     const material = new THREE.MeshPhongMaterial({ color: 0xff5533, specular: 0x111111, shininess: 200 });
    //     const mesh = new THREE.Mesh(geometry, material);

    //     mesh.position.set(0, 0, 0);
    //     mesh.rotation.set(0, 0, 0);
    //     mesh.scale.set(10, 10, 10);

    //     mesh.castShadow = true;
    //     mesh.receiveShadow = true;

    //     scene.add(mesh);

    // });
    const geometry = new THREE.SphereGeometry(3, 32, 16);
    const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    ///
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    //Create a DirectionalLight and turn on shadows for the light
    const light = new THREE.DirectionalLight(0xffffff, 1, 100);
    light.position.set(0, 0, 100); //default; light shining from top
    light.castShadow = true; // default false
    scene.add(light);
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default
    const helper = new THREE.CameraHelper(light.shadow.camera);
    scene.add(helper);

    const light2 = new THREE.DirectionalLight(0xffffff, 1, 100);
    light2.position.set(0, 0, -100); //default; light shining from top
    light2.castShadow = true; // default false
    scene.add(light2);
    light2.shadow.mapSize.width = 512; // default
    light2.shadow.mapSize.height = 512; // default
    light2.shadow.camera.near = 0.5; // default
    light2.shadow.camera.far = 500; // default
    const helper2 = new THREE.CameraHelper(light2.shadow.camera);
    scene.add(helper2);

    const light3 = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    scene.add(light3);

    //Create a sphere that cast shadows (but does not receive them)
    const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    // const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    // sphere.castShadow = true; //default is false
    // sphere.receiveShadow = false; //default
    // scene.add( sphere );



    ///
    spheres = [];
    if (!(typeof node_pos === 'undefined') && !(node_pos === null)) {
        for (var i = 0; i < node_pos.length; i++) {
            const temp_sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
            temp_sphere.castShadow = true; //default is false
            temp_sphere.receiveShadow = false; //default
            spheres.push(temp_sphere);
            spheres[i].position.x += node_pos[i][0];
            spheres[i].position.y += node_pos[i][1];
            spheres[i].position.z += node_pos[i][2];
        }
        for (var i = 0; i < spheres.length; i++)
            console.log("");
        //  scene.add( spheres[i] );

    }
    const geometry6 = new THREE.CylinderGeometry(5, 5, 20, 32);
    const material6 = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const cylinder6 = new THREE.Mesh(geometry6, material6);
    scene.add(cylinder6);
    controls = new OrbitControls(camera, r.domElement);
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    r.setSize(window.innerWidth, window.innerHeight);
}
// window.addEventListener('resize', onWindowResize, false);
class BV extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: this.props.data };
        this.myRef = React.createRef()
    }

    componentDidMount() {
        var fileContentArray = this.props.data;
        console.log(fileContentArray);
        var nodes = []
        for (var i = 0; i < fileContentArray.length; i++) {
            var temp = fileContentArray[i].split('\t');
            for (var j = 0; j < 3; j++) {
                temp[j] = parseFloat(temp[j]);
            }
            temp.pop();
            temp.pop();
            nodes.push(temp);
        }
        node_pos = nodes;
        init();

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            r.render(scene, camera);
        }
        animate();
    }

    componentDidUpdate() {
        
    }

    render() {
        return (
            <>
                <div>
                    {/* <script> */}
                    {/* {
                array.map((data)=>{
                  return(
                    <div>{data}</div>
                  )
                })
              } */}

                    {/* </script> */}
                </div>

            </>
        )
    }
}
export default BV
import React from "react";
import * as d3 from 'd3';
import Grid from '@mui/material/Grid';
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import node from '../../../test_data/tcorr_cluster_100ROIs_per_hemi_com_coordinates.txt'
import correlationFunction from "../../helpers/correlationFunction"
import example from "../chart/examples/example_regions.json"
import colorPresentation from "../../helpers/colorPresets"
import Stats from 'stats-js'
import * as dat from 'dat.gui';

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     r.setSize(window.innerWidth, window.innerHeight);
// }
// window.addEventListener('resize', onWindowResize, false);
class BV extends React.Component {

    constructor(props) {
        super(props);
        this.state = { data: this.props.data };
        this.myRef = React.createRef()
    }

    async componentDidMount() {
        let camera, scene, renderer, lightHelper,  cameraHelper, controlsPerspective, cameraOrtho, cameraPerspective;

        const params = {
            clipIntersection: true,
            planeConstant: 0,
            showHelpers: false, 
            scale: 1,
            lowerThreshold: 0.8,
            upperThreshold: 0.9
        };

        const clipPlanes = [
            new THREE.Plane(new THREE.Vector3(1, 0, 0), 0),
            new THREE.Plane(new THREE.Vector3(0, - 1, 0), 0),
            new THREE.Plane(new THREE.Vector3(0, 0, - 1), 0)
        ];

        init();

        function addShadowedLight( x, y, z, color, intensity ) {

            const directionalLight = new THREE.DirectionalLight( color, intensity );
            directionalLight.position.set( x, y, z );
            scene.add( directionalLight );

            directionalLight.castShadow = true;

            const d = 1;
            directionalLight.shadow.camera.left = - d;
            directionalLight.shadow.camera.right = d;
            directionalLight.shadow.camera.top = d;
            directionalLight.shadow.camera.bottom = - d;

            directionalLight.shadow.camera.near = 1;
            directionalLight.shadow.camera.far = 4;

            directionalLight.shadow.bias = - 0.002;

        }

        function init() {

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.localClippingEnabled = true;
            const domElement = document.getElementById('r1')
            domElement.appendChild(renderer.domElement);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xffffff);
            const aspect = window.innerWidth / window.innerHeight;
            camera = new THREE.PerspectiveCamera(20, aspect, 2, 1000);
            camera.position.set( 0,0,600 );
            scene.add(camera);
            // cameraHelper = new THREE.CameraHelper( camera );
			// scene.add( cameraHelper );
            // orthoCamera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 1, 2 );
			// orthoCamera.position.set( 0.5, 0, 1 );

            controlsPerspective = new OrbitControls(camera, renderer.domElement);
            controlsPerspective.minDistance = 20;
            controlsPerspective.maxDistance = 2400;
            controlsPerspective.addEventListener('change', render)
            
            // controlsPerspective.enablePan = true;
            // controlsPerspective.enableDamping = true;
            scene.add(controlsPerspective);
           
            // const controls = new OrbitControls(camera, renderer.domElement);
            // controlsPerspective.addEventListener('change', render); // use only if there is no animation loop
            // controls.minDistance = 1;
            // controls.maxDistance = 40;
            // controls.enablePan = false;


            // lights

            // const ambientLight = new THREE.AmbientLight( 0xffffff, 0.1 );
            // scene.add( ambientLight );

            // const pointLight = new THREE.HemisphereLight( 0x443333, 0x222233, 2 );
			// camera.add( pointLight );
            // const ambientLight = new THREE.AmbientLight( 0xffffff, 0.4 );
            // ambientLight.position.set( 0, 0, 50 );
            // scene.add( ambientLight );

            // const spotLight = new THREE.SpotLight( 0xffffff, 0.5 );
            // spotLight.position.set( 0, 0, -50 );
            // spotLight.angle = Math.PI / 4;
            // spotLight.penumbra = 0.1;
            // spotLight.decay = 2;
            // spotLight.distance = 200;

            // spotLight.castShadow = true;
            // spotLight.shadow.mapSize.width = 512;
            // spotLight.shadow.mapSize.height = 512;
            // spotLight.shadow.camera.near = 10;
            // spotLight.shadow.camera.far = 200;
            // spotLight.shadow.focus = 1;

            // lightHelper = new THREE.SpotLightHelper( spotLight );
			// scene.add( lightHelper );

            window.addEventListener('resize', onWindowResize);
            renderer.render(scene, camera);
        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);

            render();

        }


        const loader = new STLLoader();
        await loader.load('/surface.stl', function (geometry) {
            
            const material = new THREE.MeshPhongMaterial( { 
                clearcoatRoughness: 0.8,
                color: 0x808080,  
                shininess: 4,
                transparent: true,
                clearcoat: 1.0,
                clearcoatRoughness: 0.1,
                metalness: 0.9,
                roughness: 0.5,
								// color: 0x0000ff,
                opacity: 0.3
             } );
			const mesh = new THREE.Mesh( geometry, material );

            // mesh.position.set(-1, 1, -1);
            // mesh.rotation.set(-Math.PI/2, 0, 0);
            // mesh.rotation.set(-Math.PI/2, 0, -Math.PI/2);
            // mesh.rotation.set(-Math.PI/2, 0, 0);
            mesh.scale.set(-0.95, -0.95, 0.95);
            // mesh.scale.set( 2,2,2 );
            // mesh.geometry.computeVertexNormals(true);
            mesh.material.shading=THREE.SmoothShading
            // mesh.castShadow = true;
            // mesh.receiveShadow = true;

            scene.add(mesh);

            render()
        });
        // const light1=new THREE.PointLight( 0x443333,  1 );
        // light1.position.set( 0, 0, -30 );
        // scene.add(light1);
        addShadowedLight( 0, 0, -60, 0xffffff, 0.9 );
		addShadowedLight( 0, 0, 60, 0xffffff, 0.9 );
        const light = new THREE.AmbientLight( 0x404040, 2 ); // soft white light
        scene.add( light );

        let nodeCoordinates = null
        await fetch(node)
            .then(r => r.text())
            .then(text => {
                nodeCoordinates = text;
            });
        var nodes = []
        let n = 0
        nodeCoordinates.split('\r\n').map((coord, i) => {
            let each_node = []
            coord.split('  ').map((c) => {
                each_node.push(parseFloat(c))
            })
            const geometry = new THREE.SphereGeometry(2, 20, 20);
            const material = new THREE.MeshStandardMaterial({
                color: 0x000000,
                // metalness: params.roughness,
                // roughness: params.metalness,
                // shininess: 200,
                // envMapIntensity: 1.0,
                transparent: true,
                opacity: 0.1
            });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.scale.set(1, 1, 1);
            sphere.position.set(each_node[0], each_node[1], each_node[2])
            scene.add(sphere)
            nodes.push(new THREE.Vector3(each_node[0], each_node[1], each_node[2]));
            // if (n == 3) {
                
                // n = 0
            // }
            n += 1
        })

        //LINE
        // const material = new THREE.LineBasicMaterial({
        //     color: 0x0000ff,
        //     linewidth: 10
        // });

        // const geometry = new THREE.BufferGeometry().setFromPoints(nodes);

        // const line = new THREE.Line(geometry, material);
        // scene.add(line);
        var correlation = correlationFunction.calculateCorrelation(this.props.data)
        // const edges=[];
        // const boxGeometry=new THREE.BoxGeometry( 0,0,0 );;
        const degree={
        }
        Array(200).fill(1).map((node, i) =>{
            degree[i]=0
        })
        correlation.map((edge)=> {
            if (edge['value']>params.lowerThreshold && edge['value']<params.upperThreshold){
                // edges.push([edge['row'], edge['column']])
                let boxGeometry = new THREE.BoxGeometry( edge['value']/5, edge['value']/5 , 1 );
                let start, end;

                // const edges=[[1,20],[20,40], [10,30]];
                start=nodes[edge['row']]
                end=nodes[edge['column']]
                degree[edge['row']]+=1
                degree[edge['column']]+=1
                var angle = start.angleTo( end ); // radians
                const object = new THREE.Mesh( boxGeometry, new THREE.MeshPhongMaterial( {color:0x0000ff }) );
                
                object.position.copy( start );
                object.position.lerp( end, 0.5);
                object.scale.set( 1,  1, start.distanceTo( end ),  );
                object.lookAt(end );
                scene.add( object );
                // edges.map((edge)=> {
                    
                // })
            }
        })

        nodeCoordinates.split('\r\n').map((coord, i) => {
            let each_node = []
            coord.split('  ').map((c) => {
                each_node.push(parseFloat(c))
            })
            const geometry = new THREE.SphereGeometry(degree[i]/4, 20, 20);
            const material = new THREE.MeshStandardMaterial({
                color: new THREE.Color("rgb("+colorPresentation[example[i]]['color'][0]+", "+colorPresentation[example[i]]['color'][1]+", "+colorPresentation[example[i]]['color'][2]+")"),
                // metalness: params.roughness,
                // roughness: params.metalness,
                shininess: 200,
                // envMapIntensity: 1.0
            });
            const sphere = new THREE.Mesh(geometry, material);
            sphere.scale.set(1, 1, 1);
            sphere.position.set(each_node[0], each_node[1], each_node[2])
            scene.add(sphere)
            // if (n == 3) {
                
                // n = 0
            // }
            n += 1
        })

        const axis1=new THREE.AxesHelper( 10 * 5 )
        scene.add(axis1);

        
        render();

        const gui = new dat.GUI();


        // gui.add( params, 'upperThreshold', 0, 1 ).step( 0.1 ).onChange( function ( value ) {
        //     render();
        // } );
        const controllerContaineer=document.getElementById('controller')
        controllerContaineer.appendChild( gui.domElement );
        function render() {
            renderer.render(scene, camera);
        }
    }

    componentDidUpdate() {

    }

    render() {
        return (
            <>
                <div id='controller'></div>
                <div style={{ backgroundColor: "#ffffff" }} id='r1'></div>
                
                {/* <script> */}
                {/* {
                array.map((data)=>{
                  return(
                    <div>{data}</div>
                  )
                })
              } */}

                {/* </script> */}
            </>
        )
    }
}
export default BV
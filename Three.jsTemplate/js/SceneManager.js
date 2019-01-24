function SceneManager(canvas) {

    const clock = new THREE.Clock();

    const screenDimensions = {
        width: canvas.width,
        height: canvas.height
    }

    const scene = buildScene();
    const renderer = buildRender(screenDimensions);
    const camera = buildCamera(screenDimensions);
    const sceneSubjects = createSceneSubjects(scene);

    document.addEventListener('mousemove', onDocumentMouseMove, false);

    function buildScene() {
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x101010);

        return scene;
    }

    function buildRender({ width, height }) {
        const renderer = new THREE.WebGLRenderer();
        const DPR = (window.devicePixelRatio) ? window.devicePixelRatio : 1;
        renderer.setPixelRatio(DPR);
        renderer.setSize(width, height);

        canvas.appendChild(renderer.domElement);

        canvas.parentNode.appendChild(WEBVR.createButton(renderer, { frameOfReferenceType: 'head-model' }));

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        return renderer;
    }

    function buildCamera({ width, height }) {
        const aspectRatio = width / height;
        const fieldOfView = 75;
        const nearPlane = 1;
        const farPlane = 2000;
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.layers.enable(1);

        return camera;
    }

    function createSceneSubjects(scene) {
        const sceneSubjects = [
            new Flat3DImage(scene),
            new Video360StereoView(scene)
        ];

        return sceneSubjects;
    }

    this.update = function() {
        const elapsedTime = clock.getElapsedTime();

        for (let i = 0; i < sceneSubjects.length; i++)
            sceneSubjects[i].update(elapsedTime);

        renderer.render(scene, camera);
    }

    this.onWindowResize = function() {
        const { width, height } = canvas;

        screenDimensions.width = width;
        screenDimensions.height = height;

        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        renderer.setSize(width, height);
    }

    function onDocumentMouseMove(event) {

        var mouse = new THREE.Vector2();
        console.log(mouse);
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        var raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        console.log(scene.children)
        var intersects = raycaster.intersectObjects(scene.children);

        if (intersects.length > 2) {
            canvas.parentNode.style.cursor = "pointer";
            for (var i = 1; i < intersects.length - 2; i++) {

				intersects[i].object.material.color.set(0xff0000);

			}
        }
        else {
            canvas.parentNode.style.cursor = "default";
            
        }

    }
}

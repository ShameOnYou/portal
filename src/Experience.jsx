import {
	Sparkles,
	OrbitControls,
	useGLTF,
	useTexture,
	Center,
	Stars,
	Sky,
	shaderMaterial,
} from "@react-three/drei";

import { extend, useFrame } from "@react-three/fiber";
import { Color } from "three";
import { useRef } from "react";

import portalVertexShader from "./shaders/portal/vertex.glsl";
import portalFragmentShader from "./shaders/portal/fragment.glsl";
import { Perf } from "r3f-perf";

const PortalMaterial = shaderMaterial(
	{
		uTime: 0,
		uColorStart: new Color("#9e7700"),
		uColorEnd: new Color("#f0b400"),
	},
	portalVertexShader,
	portalFragmentShader
);

extend({ PortalMaterial });

export default function Experience() {
	const portalMaterial = useRef();

	const { nodes } = useGLTF("./model/portal.glb");
	const bakedTexture = useTexture("./model/baked.jpg");

	bakedTexture.flipY = false;

	useFrame((state, delta) => {
		portalMaterial.current.uTime += delta;
	});
	console.log(Stars);
	return (
		<>
			<Perf position="top-left" />
			<color args={["#030202"]} attach="background" />
			<OrbitControls makeDefault />

			<Center>
				<mesh geometry={nodes.baked.geometry}>
					<meshBasicMaterial map={bakedTexture} />
				</mesh>

				<mesh
					geometry={nodes.poleLightA.geometry}
					position={nodes.poleLightA.position}
				>
					<meshBasicMaterial color="#ffffe5" />
				</mesh>
				<mesh
					geometry={nodes.poleLightB.geometry}
					position={nodes.poleLightB.position}
				>
					<meshBasicMaterial color="#ffffe5" />
				</mesh>

				<mesh
					geometry={nodes.portalLight.geometry}
					position={nodes.portalLight.position}
					rotation={nodes.portalLight.rotation}
				>
					<portalMaterial ref={portalMaterial} />
				</mesh>

				<Sparkles
					size={6}
					scale={[4, 2, 4]}
					position-y={1}
					speed={0.2}
					count={40}
					color={"#ab6227"}
				/>
			</Center>

			<Stars
				radius={10}
				depth={50}
				count={5000}
				factor={2}
				saturation={1}
				fade
				speed={10}
			/>
		</>
	);
}

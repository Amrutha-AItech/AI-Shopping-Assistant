import { Canvas, useFrame } from "@react-three/fiber";
import {
    Float,
    RoundedBox,
    Line,
    Text,
} from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/* COLORS */

const COLORS = {
    pink: "#D83F87",
    purple: "#44318D",
    deepPurple: "#2A1B3D",
    coral: "#E98074",
    soft: "#FAD9D5",
    blue: "#2448C8",
    white: "#FFFFFF",
    dark: "#08051A",
};


 /* FLOATING ORB */
 

function FloatingOrb({
    position,
    color,
    size = 0.13,
    speed = 1,
}) {
    return (
        <Float
            speed={speed}
            rotationIntensity={0.8}
            floatIntensity={0.8}
        >
            <mesh position={position}>
                <sphereGeometry args={[size, 20, 20]} />

                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.45}
                    roughness={0.2}
                    metalness={0.25}
                />
            </mesh>
        </Float>
    );
}

/*
   AI CORE
*/

function AICore({ coreRef }) {
    const ring1 = useRef(null);
    const ring2 = useRef(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (ring1.current) {
            ring1.current.rotation.z = time * 0.45;
            ring1.current.rotation.x =
                Math.sin(time * 0.7) * 0.15;
        }

        if (ring2.current) {
            ring2.current.rotation.z = -time * 0.3;
            ring2.current.rotation.y =
                Math.sin(time * 0.5) * 0.2;
        }
    });

    return (
        <group
            ref={coreRef}
            position={[0, 2.35, 0]}
        >
            {/* Main AI sphere */}
            <mesh>
                <sphereGeometry args={[0.43, 32, 32]} />

                <meshStandardMaterial
                    color={COLORS.blue}
                    emissive={COLORS.blue}
                    emissiveIntensity={0.65}
                    roughness={0.18}
                    metalness={0.35}
                />
            </mesh>

            {/* Inner glow */}
            <mesh scale={0.72}>
                <sphereGeometry args={[0.43, 24, 24]} />

                <meshBasicMaterial
                    color="#7B8CFF"
                    transparent
                    opacity={0.35}
                    depthWrite={false}
                />
            </mesh>

            {/* Pink orbit */}
            <mesh
                ref={ring1}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <torusGeometry
                    args={[0.62, 0.035, 16, 64]}
                />

                <meshStandardMaterial
                    color={COLORS.pink}
                    emissive={COLORS.pink}
                    emissiveIntensity={1}
                />
            </mesh>

            {/* White orbit */}
            <mesh
                ref={ring2}
                rotation={[0.55, 0.2, 0]}
            >
                <torusGeometry
                    args={[0.72, 0.018, 12, 64]}
                />

                <meshStandardMaterial
                    color={COLORS.soft}
                    emissive={COLORS.soft}
                    emissiveIntensity={0.7}
                />
            </mesh>

            {/* AI label */}
            <Text
                position={[0, -0.02, 0.44]}
                fontSize={0.18}
                color={COLORS.soft}
                anchorX="center"
                anchorY="middle"
            >
                AI
            </Text>

            {/* AI description */}
            <Text
                position={[0, -0.7, 0]}
                fontSize={0.105}
                color={COLORS.soft}
                anchorX="center"
                anchorY="middle"
            >
                SMART SHOPPING
            </Text>
        </group>
    );
}

/* 
   CATEGORY NODE
 */

function CategoryNode({
    position,
    color,
    label,
}) {
    const nodeRef = useRef(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (nodeRef.current) {
            nodeRef.current.rotation.y =
                time * 0.25;

            nodeRef.current.position.y =
                position[1] +
                Math.sin(
                    time * 1.4 + position[0]
                ) *
                    0.045;
        }
    });

    return (
        <group
            ref={nodeRef}
            position={position}
        >
            {/* Soft glow */}
            <mesh position={[0, 0, -0.08]}>
                <sphereGeometry
                    args={[0.35, 16, 16]}
                />

                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.12}
                    depthWrite={false}
                />
            </mesh>

            {/* Category node */}
            <RoundedBox
                args={[0.48, 0.48, 0.28]}
                radius={0.1}
                smoothness={5}
            >
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.35}
                    roughness={0.2}
                    metalness={0.25}
                />
            </RoundedBox>

            {/* Center symbol */}
            <mesh position={[0, 0, 0.15]}>
                <torusGeometry
                    args={[0.115, 0.025, 16, 32]}
                />

                <meshStandardMaterial
                    color={COLORS.soft}
                    emissive={COLORS.soft}
                    emissiveIntensity={0.8}
                />
            </mesh>

            {/* Category label */}
            <Text
                position={[0, -0.4, 0]}
                fontSize={0.095}
                color={COLORS.soft}
                anchorX="center"
                anchorY="middle"
            >
                {label}
            </Text>
        </group>
    );
}

/* 
   SHOPPING CART
*/

function ShoppingCart({ cartRef }) {
    const wheel1 = useRef(null);
    const wheel2 = useRef(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        if (wheel1.current) {
            wheel1.current.rotation.x =
                time * 2;
        }

        if (wheel2.current) {
            wheel2.current.rotation.x =
                time * 2;
        }
    });

    return (
        <Float
            speed={1.4}
            rotationIntensity={0.06}
            floatIntensity={0.18}
        >
            <group
                ref={cartRef}
                position={[0, -1.15, 0]}
                rotation={[0, -0.08, -0.02]}
            >
                {/* Cart body */}
                <RoundedBox
                    args={[1.55, 0.62, 0.68]}
                    radius={0.16}
                    smoothness={8}
                >
                    <meshStandardMaterial
                        color={COLORS.pink}
                        emissive={COLORS.pink}
                        emissiveIntensity={0.12}
                        roughness={0.22}
                        metalness={0.25}
                    />
                </RoundedBox>

                {/* AI screen */}
                <RoundedBox
                    args={[1.18, 0.34, 0.05]}
                    radius={0.08}
                    smoothness={6}
                    position={[0, 0, 0.36]}
                >
                    <meshStandardMaterial
                        color={COLORS.dark}
                        roughness={0.15}
                        metalness={0.4}
                    />
                </RoundedBox>

                {/* AI eye */}
                <mesh position={[0, 0, 0.4]}>
                    <torusGeometry
                        args={[0.17, 0.055, 24, 48]}
                    />

                    <meshStandardMaterial
                        color={COLORS.soft}
                        emissive={COLORS.coral}
                        emissiveIntensity={1}
                    />
                </mesh>

                {/* Eye center */}
                <mesh position={[0, 0, 0.405]}>
                    <sphereGeometry
                        args={[0.075, 20, 20]}
                    />

                    <meshStandardMaterial
                        color={COLORS.dark}
                        emissive={COLORS.dark}
                    />
                </mesh>

                {/* Cart handle */}
                <mesh
                    position={[0.83, 0.2, 0]}
                    rotation={[0, 0, -0.35]}
                >
                    <capsuleGeometry
                        args={[0.055, 0.55, 8, 16]}
                    />

                    <meshStandardMaterial
                        color={COLORS.soft}
                        emissive={COLORS.soft}
                        emissiveIntensity={0.2}
                        metalness={0.4}
                    />
                </mesh>

                {/* Left wheel */}
                <mesh
                    ref={wheel1}
                    position={[
                        -0.48,
                        -0.38,
                        0.28,
                    ]}
                    rotation={[
                        Math.PI / 2,
                        0,
                        0,
                    ]}
                >
                    <torusGeometry
                        args={[
                            0.13,
                            0.055,
                            16,
                            32,
                        ]}
                    />

                    <meshStandardMaterial
                        color="#65718A"
                        metalness={0.75}
                        roughness={0.18}
                    />
                </mesh>

                {/* Right wheel */}
                <mesh
                    ref={wheel2}
                    position={[
                        0.48,
                        -0.38,
                        0.28,
                    ]}
                    rotation={[
                        Math.PI / 2,
                        0,
                        0,
                    ]}
                >
                    <torusGeometry
                        args={[
                            0.13,
                            0.055,
                            16,
                            32,
                        ]}
                    />

                    <meshStandardMaterial
                        color="#65718A"
                        metalness={0.75}
                        roughness={0.18}
                    />
                </mesh>

                {/* Product 1 */}
                <RoundedBox
                    args={[0.34, 0.48, 0.3]}
                    radius={0.07}
                    smoothness={5}
                    position={[
                        -0.38,
                        0.5,
                        0,
                    ]}
                    rotation={[
                        0,
                        0,
                        -0.04,
                    ]}
                >
                    <meshStandardMaterial
                        color={COLORS.soft}
                        roughness={0.3}
                    />
                </RoundedBox>

                {/* Product 2 */}
                <RoundedBox
                    args={[0.34, 0.58, 0.3]}
                    radius={0.07}
                    smoothness={5}
                    position={[0, 0.54, 0]}
                >
                    <meshStandardMaterial
                        color={COLORS.blue}
                        emissive={COLORS.blue}
                        emissiveIntensity={0.15}
                        roughness={0.28}
                    />
                </RoundedBox>

                {/* Product 3 */}
                <RoundedBox
                    args={[0.34, 0.42, 0.3]}
                    radius={0.07}
                    smoothness={5}
                    position={[
                        0.38,
                        0.48,
                        0,
                    ]}
                >
                    <meshStandardMaterial
                        color={COLORS.coral}
                        roughness={0.28}
                    />
                </RoundedBox>
            </group>
        </Float>
    );
}

/*
   CONNECTION LINES
*/

function Connections() {
    return (
        <group>
            {/* AI → Skincare */}
            <Line
                points={[
                    [0, 1.9, 0],
                    [-0.95, 1.25, 0],
                    [-1.05, 0.85, 0],
                ]}
                color={COLORS.coral}
                lineWidth={1.2}
                transparent
                opacity={0.8}
            />

            {/* AI → Makeup */}
            <Line
                points={[
                    [0, 1.9, 0],
                    [0, 1.15, 0],
                    [0, 0.85, 0],
                ]}
                color={COLORS.pink}
                lineWidth={1.3}
                transparent
                opacity={0.8}
            />

            {/* AI → Kitchen */}
            <Line
                points={[
                    [0, 1.9, 0],
                    [0.95, 1.25, 0],
                    [1.05, 0.85, 0],
                ]}
                color={COLORS.blue}
                lineWidth={1.2}
                transparent
                opacity={0.8}
            />

            {/* Skincare → Cart */}
            <Line
                points={[
                    [-1.05, 0.65, 0],
                    [-0.55, 0.1, 0],
                    [-0.35, -0.65, 0],
                ]}
                color={COLORS.soft}
                lineWidth={0.8}
                transparent
                opacity={0.65}
            />

            {/* Makeup → Cart */}
            <Line
                points={[
                    [0, 0.65, 0],
                    [0, 0.1, 0],
                    [0, -0.65, 0],
                ]}
                color={COLORS.soft}
                lineWidth={0.8}
                transparent
                opacity={0.65}
            />

            {/* Kitchen → Cart */}
            <Line
                points={[
                    [1.05, 0.65, 0],
                    [0.55, 0.1, 0],
                    [0.35, -0.65, 0],
                ]}
                color={COLORS.soft}
                lineWidth={0.8}
                transparent
                opacity={0.65}
            />

            {/* Decorative web left */}
            <Line
                points={[
                    [-1.55, 1.8, -0.05],
                    [-1.2, 1.45, -0.05],
                    [-0.9, 1.2, -0.05],
                ]}
                color={COLORS.soft}
                lineWidth={0.55}
                transparent
                opacity={0.55}
            />

            {/* Decorative web right */}
            <Line
                points={[
                    [1.55, 1.8, -0.05],
                    [1.2, 1.45, -0.05],
                    [0.9, 1.2, -0.05],
                ]}
                color={COLORS.pink}
                lineWidth={0.55}
                transparent
                opacity={0.55}
            />
        </group>
    );
}

/* 
   INTERACTIVE SCENE
 */

function InteractiveScene() {
    const sceneRef = useRef(null);
    const coreRef = useRef(null);
    const cartRef = useRef(null);

    useLayoutEffect(() => {
        if (!sceneRef.current) {
            return undefined;
        }

        const scene = sceneRef.current;

        /* 
           MOUSE PARALLAX
         */

        const handleMouseMove = (event) => {
            if (!sceneRef.current) {
                return;
            }

            const x =
                (event.clientX /
                    window.innerWidth -
                    0.5) *
                2;

            const y =
                (event.clientY /
                    window.innerHeight -
                    0.5) *
                2;

            gsap.to(scene.rotation, {
                x: -y * 0.055,
                y: x * 0.1,
                duration: 0.9,
                ease: "power3.out",
                overwrite: true,
            });
        };

        window.addEventListener(
            "mousemove",
            handleMouseMove
        );

        /* 
           MAIN FLOAT
         */

        const floatAnimation = gsap.to(
            scene.position,
            {
                y: "-=0.1",
                duration: 2.4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            }
        );

        /* 
           AI CORE BREATHING
         */

        let coreAnimation = null;

        if (coreRef.current) {
            coreAnimation = gsap.to(
                coreRef.current.scale,
                {
                    x: 1.06,
                    y: 1.06,
                    z: 1.06,
                    duration: 1.8,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                }
            );
        }

        /* 
           CART MOVEMENT
         */

        let cartAnimation = null;

        if (cartRef.current) {
            cartAnimation = gsap.to(
                cartRef.current.rotation,
                {
                    z: 0.025,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                }
            );
        }

        /* 
           CLEANUP
         */

        return () => {
            window.removeEventListener(
                "mousemove",
                handleMouseMove
            );

            floatAnimation.kill();

            if (coreAnimation) {
                coreAnimation.kill();
            }

            if (cartAnimation) {
                cartAnimation.kill();
            }

            gsap.killTweensOf(scene.rotation);
            gsap.killTweensOf(scene.position);
        };
    }, []);

    return (
        <group
            ref={sceneRef}
            position={[0, -0.35, 0]}
            scale={1.15}
        >
            {/* 
                LIGHTING
             */}

            <ambientLight intensity={0.65} />

            <directionalLight
                position={[4, 6, 5]}
                intensity={2.5}
            />

            <pointLight
                position={[0, 2.5, 1]}
                color={COLORS.pink}
                intensity={3}
                distance={5}
            />

            <pointLight
                position={[-2, 0, 1]}
                color={COLORS.purple}
                intensity={2}
                distance={4}
            />

            <pointLight
                position={[2, -1, 1]}
                color={COLORS.blue}
                intensity={2}
                distance={4}
            />

            {/*
                AI CORE
           */}

            <AICore coreRef={coreRef} />

            {/* 
                CATEGORY NODES
            */}

            <CategoryNode
                position={[-1.05, 0.85, 0]}
                color={COLORS.coral}
                label="SKINCARE"
            />

            <CategoryNode
                position={[0, 0.85, 0]}
                color={COLORS.pink}
                label="MAKEUP"
            />

            <CategoryNode
                position={[1.05, 0.85, 0]}
                color={COLORS.blue}
                label="KITCHEN"
            />

            {/* 
                CONNECTIONS
             */}

            <Connections />

            {/* 
                SHOPPING CART
             */}

            <ShoppingCart
                cartRef={cartRef}
            />

            {/* 
                FLOATING ORBS
             */}

            <FloatingOrb
                position={[-1.8, 1.7, -0.2]}
                color={COLORS.pink}
                size={0.12}
                speed={1.2}
            />

            <FloatingOrb
                position={[1.75, 1.85, -0.2]}
                color={COLORS.coral}
                size={0.15}
                speed={1.4}
            />

            <FloatingOrb
                position={[-1.65, -0.45, -0.1]}
                color={COLORS.blue}
                size={0.1}
                speed={1.6}
            />

            <FloatingOrb
                position={[1.65, -0.4, -0.1]}
                color={COLORS.soft}
                size={0.11}
                speed={1.3}
            />

            <FloatingOrb
                position={[0.55, 2.85, -0.1]}
                color={COLORS.coral}
                size={0.08}
                speed={1.8}
            />

            <FloatingOrb
                position={[-0.7, 2.8, -0.1]}
                color={COLORS.blue}
                size={0.08}
                speed={1.5}
            />
        </group>
    );
}

/* 
   MAIN COMPONENT
*/

function ShoppingHero3D() {
    return (
        <div className="w-full h-[360px] md:h-[460px]">
            <Canvas
                camera={{
                    position: [0, 0, 7],
                    fov: 50,
                }}
                dpr={[1, 1.5]}
                gl={{
                    antialias: true,
                    alpha: true,
                    powerPreference:
                        "high-performance",
                }}
            >
                {/* IMPORTANT:
                    No <color attach="background" ... />
                    here.

                    The Canvas is transparent so the
                    hero's shared universe background
                    remains visible behind the 3D scene.
                */}

                <InteractiveScene />
            </Canvas>
        </div>
    );
}

export default ShoppingHero3D;
import { Viewer } from "@photo-sphere-viewer/core";
import { useEffect, useRef } from "react";

interface PanoramaViewerProps {
    src: string;
}

export default function PanoramaViewer({
    src,
}: PanoramaViewerProps) {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!container.current || !src) return;

        const viewer = new Viewer({
            container: container.current,
            panorama: src,

            defaultYaw: "0deg",
            defaultPitch: "0deg",

            mousewheel: true,
            touchmoveTwoFingers: false,

            navbar: [
                "zoom",
                "move",
                "fullscreen",
            ],
        });

        return () => {
            viewer.destroy();
        };
    }, [src]);

    return (
        <div
            ref={container}
            className="w-full h-150 rounded-xl overflow-hidden"
        />
    );
}
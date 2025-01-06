export default function Loading({ WidthIcon, HeightIcon }: { WidthIcon: string, HeightIcon: string }) {
    return (
        <div style={{ width: WidthIcon, height: HeightIcon }}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#4F46E5" />
                        <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                </defs>

                <circle cx="50" cy="50" r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    stroke-width="2"
                    stroke-dasharray="70 180"
                    stroke-linecap="round">
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        dur="2s"
                        repeatCount="indefinite"
                    />
                </circle>

                <circle cx="50" cy="50" r="30"
                    fill="none"
                    stroke="url(#gradient)"
                    stroke-width="4"
                    stroke-dasharray="40 100"
                    opacity="0.7">
                    <animate
                        attributeName="stroke-dashoffset"
                        values="0;140"
                        dur="1.5s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.7;0.3;0.7"
                        dur="1.5s"
                        repeatCount="indefinite"
                    />
                </circle>

                <circle cx="50" cy="50" r="15"
                    fill="url(#gradient)"
                    opacity="0.8">
                    <animate
                        attributeName="r"
                        values="15;13;15"
                        dur="1s"
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.8;1;0.8"
                        dur="1s"
                        repeatCount="indefinite"
                    />
                </circle>

                <circle cx="50" cy="15" r="3" fill="#4F46E5">
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="0 50 50"
                        to="360 50 50"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                </circle>

                <circle cx="50" cy="15" r="3" fill="#7C3AED">
                    <animateTransform
                        attributeName="transform"
                        attributeType="XML"
                        type="rotate"
                        from="180 50 50"
                        to="540 50 50"
                        dur="3s"
                        repeatCount="indefinite"
                    />
                </circle>
            </svg>
        </div>
    )
}
import React from 'react';

export default function NavBar() {
    return (
        <div style={{
            height: "7vh",
            backgroundColor: "#04061c",
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingBlock: '1.5vh',
        }}>
            <h1 style={{
                color: 'white',
                marginLeft: '2em',
            }}
                onClick={() => window.location.href = '/'}
            >
                Dreem
            </h1>
            <ul style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '12vw',
                marginRight: '4em',
                marginTop: "0.5em",
            }}>
                <li>
                    <a style={{
                        color: 'white',
                    }}
                        href="/"
                    >
                        Home
                    </a>
                </li>

                <li>
                    <a style={{
                        color: 'white',
                    }} href="/history">
                        History
                    </a>
                </li>
                <li>
                    <a style={{
                        color: 'white',
                    }}
                        href="/about">
                        About
                    </a>
                </li>

            </ul>
        </div>
    );
}

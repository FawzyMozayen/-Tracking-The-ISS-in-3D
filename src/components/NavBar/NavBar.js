import React from 'react';

export default function NavBar() {
    return (
        <div style={{
            position: "absolute",
            backgroundColor: "transparent",
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingBlock: '1%',
            width: '100%',
        }}>
            <h1 style={{
                color: 'white',
                marginLeft: '2em',
                cursor: 'pointer',
            }}
                onClick={() => window.location.href = '/'}
            >
                ISS Tracker
            </h1>
            <ul style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: 200,
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

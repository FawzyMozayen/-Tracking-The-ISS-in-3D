import React from 'react';

export default function NavBar() {
    return (
        <div style={{
            height: "4%",
            backgroundColor: "#04061c",
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingBlock: '1vh',
        }}>
            <h1 style={{
                color: 'white',
                marginLeft: '2em',
            }}>
                Dreem
            </h1>
            <ul style={{
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '20vw',
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
                    }} href="/about">
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
                {/* <li>
                    <a style={{
                        color: 'white',
                    }} href="/about">
                        Home
                    </a>
                </li> */}
            </ul>
        </div>
    );
}

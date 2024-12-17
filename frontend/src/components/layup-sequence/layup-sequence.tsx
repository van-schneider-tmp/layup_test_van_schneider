import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import * as Styled from './layup-sequence.styles.ts';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const layupSequence = (n: number) => {
    if (n === 1) return 1;
    if (n === 2) return 2;

    let S1 = 1, S2 = 2, S_current = 0;

    for (let i = 3; i <= n; i++) {
        if (i % 2 === 0) {
            S_current = S1 + S2;
        } else {
            S_current = 2 * S2 - S1;
        }


        S1 = S2;
        S2 = S_current;
    }

    return S_current;
};

const LayupSequenceChart = () => {
    const [n, setN] = useState(20);
    const [runtimeData, setRuntimeData] = useState<{ n: number, runtime: number }[]>([]);

    useEffect(() => {
        const measureRuntime = () => {
            const newData: typeof runtimeData = [];
            for (let i = 1; i <= n; i++) {
                const start = performance.now();

                // Averaging runs to avoid GC / other outliers
                const iterations = 10;
                for (let j = 0; j < iterations; j++) {
                    layupSequence(i * 1000);
                }

                const end = performance.now();
                const runtime = (end - start) / iterations;
                newData.push({ n: i, runtime });
            }
            setRuntimeData(newData);
        };

        measureRuntime();
    }, [n]);

    const data = {
        labels: runtimeData.map((item) => item.n),
        datasets: [
            {
                label: 'Runtime (ms)',
                data: runtimeData.map((item) => item.runtime),
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Layup Sequence Runtime vs. N',
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => `N = ${context.label}, Runtime = ${context.raw.toFixed(2)} ms`,
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'N (thousands of steps)',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Runtime (ms)',
                },
            },
        },
    };
    const handleNumberChange = (value) => {
        setN(value);
    };


    return (<>
        <Styled.Wrapper>
            <Styled.Title>Layup Sequence Runtime Visualization</Styled.Title>

            <Styled.StyledRow justify="center" align="middle">
                <Styled.StyledCol>
                    <span>Compute Layup Sequence for N :</span>
                </Styled.StyledCol>
                <Styled.StyledCol>
                    <Styled.StyledInput
                        value={n}
                        onChange={handleNumberChange}
                        min={1}
                        addonAfter="thousand"
                    />
                </Styled.StyledCol>
            </Styled.StyledRow>

            <Line data={data} options={options} />


        </Styled.Wrapper >
        <Styled.TextWrapper>
            <h4>Time Complexity:</h4>
            <p>
                The time complexity of this algorithm is O(n).
                The approach can be iterative, computing the next value given the solution of the previous value (n).
                Or recursive, computing the solution from n - 0, popping the call stack and recieving the final answer.
                In either case, the time complexity is linear. It is a relatively straightforward mathematical sequence, and ~likely
                cannot be worked by some of the more aggressive algorithm flavors.
            </p>
            <p>
                I'm running the algorithm here in React and Javascript, so there existed runtime outliers due to other scheduled tasks in the
                event loop (maybe for component mounting / rendering engine and Javascripts garbage collection).
                To remedy, I ran each N iteration 10 times and took the average runtime.
                The plot is fairly linear showing O(n). If you tick up the number for N, it gets a little better.
                Possibly released from lingering component mounting or rendering process (DOM updates).
            </p>
        </Styled.TextWrapper>
    </>
    );
};


export default LayupSequenceChart;

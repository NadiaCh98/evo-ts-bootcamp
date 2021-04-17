import React from 'react';
import Item from '../../components/Item/Item';
import { generateRandomArray, generateRandomIntegerInclusive } from './services/rng';
import './BubbleSortMain.scss';
import { bubbleSort, IntervalResult } from './services/bubbleSortCalculator';

export type SortingItem = number;
export type SortingArray = SortingItem[];

export enum SortingStatus {
    ON_START = 'Let\'s go!',
    IN_PROGRESS = 'Sorting...',
    ON_PAUSE = 'On Pause',
    SOLVED = 'Completed!'
};

type ChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => void;

interface BubbleSortMainState {
    arrayItems: SortingArray;
    isAscOrder: boolean;
    sortIterval: number;
    status: SortingStatus;
    length: number;
    currentItemIndex?: number;
}

class BubbleSortMain extends React.Component<{}, BubbleSortMainState> {

    private intervalId: NodeJS.Timeout;
    private sortedArrayByInterval: IntervalResult<SortingItem>[];

    state: BubbleSortMainState = {
        arrayItems: [],
        sortIterval: 100,
        isAscOrder: true,
        status: SortingStatus.ON_START,
        length: 10
    }

    componentDidMount() {
        this.initGame();
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    initGame = (): void => {
        const items: SortingArray = generateRandomArray(generateRandomIntegerInclusive, this.state.length);
        this.sortedArrayByInterval = bubbleSort(items, this.state.isAscOrder);
        this.setState({ arrayItems: items });
    }

    visialize = async (oneIterate = false): Promise<void> => {
        if (this.state.status === SortingStatus.IN_PROGRESS && this.sortedArrayByInterval.length > 0) {
            const currentInterval = this.sortedArrayByInterval[0];
            this.sortedArrayByInterval = this.sortedArrayByInterval.slice(1);
            this.intervalId = await setTimeout(
                () => this.setState(
                    {arrayItems: currentInterval.intervalArray, currentItemIndex: currentInterval.currentItemIndex},
                    () => !oneIterate && this.visialize()
                ),
                this.state.sortIterval
            );
        } else if (this.sortedArrayByInterval.length === 0) {
            this.setState({status: SortingStatus.SOLVED, currentItemIndex: undefined})
        }
    }

    start = (): void => {
        this.sortedArrayByInterval = bubbleSort(this.state.arrayItems, this.state.isAscOrder);
        this.setState(
            { status: SortingStatus.IN_PROGRESS },
            async () => await this.visialize()
        );
    }

    pause = (): void => {
        this.setState(
            { status: this.state.status === SortingStatus.IN_PROGRESS ? SortingStatus.ON_PAUSE : SortingStatus.IN_PROGRESS },
            async () => {
                if (this.state.status === SortingStatus.IN_PROGRESS) {
                    await this.visialize();
                }
            }
        );
    }

    reset = (): void => {
        this.setState(
            { currentItemIndex: undefined, status: SortingStatus.ON_START },
            () => this.initGame()
        );
    }

    iterate = (): void => {
        this.setState(
            {status: SortingStatus.IN_PROGRESS},
            async () => await this.visialize(true)
        );
    }

    changeSortOrder: ChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            isAscOrder: !(event.target.type === 'checkbox' && event.target.checked)
        });
    }

    changeSortInterval: ChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            sortIterval: +event.target.value
        });
    }

    changeSortingArray: ChangeInputValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            length: +event.target.value
        }, () => this.initGame());
    }

    render() {
        return (
            <div className="bubble-sort__main">
                <header>
                    <h1>Bubble Sorting</h1>
                </header>
                <main>
                    <div className="items">
                        {
                            this.state.arrayItems.map((value, index) =>
                                <Item
                                    key={index}
                                    at={value}
                                    isActive={this.state.currentItemIndex === index}
                                />
                            )
                        }
                    </div>
                </main>
                <footer>
                    <p>{this.state.status}</p>
                    <div>
                        <label htmlFor='order'>Desc Order</label>
                        <input id='order'
                            type="checkbox"
                            checked={!this.state.isAscOrder}
                            disabled={this.state.status === SortingStatus.IN_PROGRESS || this.state.status === SortingStatus.ON_PAUSE}
                            onChange={(event) => this.changeSortOrder(event)}
                        />
                    </div>

                    <div>
                        <label htmlFor='interval'>Sorting Interval</label>
                        <input id='interval'
                            value={this.state.sortIterval}
                            type="range"
                            min="100" max="1000" step="100"
                            disabled={this.state.status === SortingStatus.IN_PROGRESS}
                            onChange={(event) => this.changeSortInterval(event)}
                        />
                    </div>

                    <div>
                        <label htmlFor='array'>Array Length</label>
                        <input id='array'
                            type="range"
                            value={this.state.length}
                            min="5" max="100" step="5"
                            disabled={this.state.status === SortingStatus.IN_PROGRESS || this.state.status === SortingStatus.ON_PAUSE}
                            onChange={(event) => this.changeSortingArray(event)}
                        />
                    </div>

                    <button onClick={() => this.start()}
                        disabled={this.state.status !== SortingStatus.ON_START}
                    >
                        Start
                    </button>
                    <button onClick={() => this.reset()}
                        disabled={this.state.status === SortingStatus.IN_PROGRESS}
                    >
                        Reset
                    </button>
                    <button onClick={() => this.iterate()}
                        disabled={this.state.status === SortingStatus.SOLVED}
                    >
                        Iterate
                    </button>
                    <button onClick={() => this.pause()}
                        disabled={this.state.status === SortingStatus.SOLVED || this.state.status === SortingStatus.ON_START}
                    >
                        {this.state.status === SortingStatus.ON_PAUSE ? 'Resume' : 'Pause'}
                    </button>
                </footer>
            </div>
        );
    }

}

export default BubbleSortMain;
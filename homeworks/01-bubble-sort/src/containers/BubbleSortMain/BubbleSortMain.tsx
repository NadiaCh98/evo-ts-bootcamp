import React from 'react';
import Item from '../../components/Item/Item';
import { generateRandomArray, generateRandomIntegerInclusive } from './services/rng';
import './BubbleSortMain.scss';
import { bubbleSort, IntervalResult } from './services/bubbleSortCalculator';

export type SortingItem = number;
export type SortingArray = SortingItem[];

export enum SortingStatus {
    OnStart = 'Let\'s go!',
    InProgress = 'Sorting...',
    OnPause = 'On Pause',
    Solved = 'Completed!'
};

interface BubbleSortMainState {
    arrayItems: SortingArray;
    isAscOrder: boolean;
    sortIterval: number;
    status: SortingStatus;
    length: number;
    currentItemIndex?: number;
}

class BubbleSortMain extends React.Component<{}, BubbleSortMainState> {

    private timeoutId: number;
    private sortedArrayByInterval: IntervalResult<SortingItem>[];

    state: BubbleSortMainState = {
        arrayItems: [],
        sortIterval: 100,
        isAscOrder: true,
        status: SortingStatus.OnStart,
        length: 10
    }

    componentDidMount() {
        this.initGame();
    }

    componentWillUnmount() {
        window.clearTimeout(this.timeoutId);
    }

    initGame = (): void => {
        const items: SortingArray = generateRandomArray(generateRandomIntegerInclusive, this.state.length);
        this.sortedArrayByInterval = bubbleSort(items, this.state.isAscOrder);
        this.setState({ arrayItems: items });
    }

    visialize = (oneIterate = false): void => {
        if (this.state.status === SortingStatus.InProgress && this.sortedArrayByInterval.length > 0) {
            const currentInterval = this.sortedArrayByInterval[0];
            this.sortedArrayByInterval = this.sortedArrayByInterval.slice(1);
            this.timeoutId = window.setTimeout(
                () => this.setState(
                    {arrayItems: currentInterval.intervalArray, currentItemIndex: currentInterval.currentItemIndex},
                    () => !oneIterate && this.visialize()
                ),
                this.state.sortIterval
            );
        } else if (this.sortedArrayByInterval.length === 0) {
            this.setState({status: SortingStatus.Solved, currentItemIndex: undefined})
        }
    }

    start = (): void => {
        this.sortedArrayByInterval = bubbleSort(this.state.arrayItems, this.state.isAscOrder);
        this.setState(
            { status: SortingStatus.InProgress },
            async () => await this.visialize()
        );
    }

    pause = (): void => {
        this.setState(
            { status: this.state.status === SortingStatus.InProgress ? SortingStatus.OnPause : SortingStatus.InProgress },
            async () => {
                if (this.state.status === SortingStatus.InProgress) {
                    await this.visialize();
                }
            }
        );
    }

    reset = (): void => {
        this.setState(
            { currentItemIndex: undefined, status: SortingStatus.OnStart },
            () => this.initGame()
        );
    }

    iterate = (): void => {
        this.setState(
            {status: SortingStatus.InProgress},
            async () => await this.visialize(true)
        );
    }

    changeSortOrder: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({
            isAscOrder: !event.target.checked
        });
    }

    changeSortInterval: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        this.setState({
            sortIterval: +event.target.value
        });
    }

    changeSortingArray: React.ChangeEventHandler<HTMLInputElement> = (event): void => {
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
                            disabled={this.state.status === SortingStatus.InProgress || this.state.status === SortingStatus.OnPause}
                            onChange={this.changeSortOrder}
                        />
                    </div>

                    <div>
                        <label htmlFor='interval'>Sorting Interval</label>
                        <input id='interval'
                            value={this.state.sortIterval}
                            type="range"
                            min="100" max="1000" step="100"
                            disabled={this.state.status === SortingStatus.InProgress}
                            onChange={this.changeSortInterval}
                        />
                    </div>

                    <div>
                        <label htmlFor='array'>Array Length</label>
                        <input id='array'
                            type="range"
                            value={this.state.length}
                            min="5" max="100" step="5"
                            disabled={this.state.status === SortingStatus.InProgress || this.state.status === SortingStatus.OnPause}
                            onChange={this.changeSortingArray}
                        />
                    </div>

                    <button onClick={this.start}
                        disabled={this.state.status !== SortingStatus.OnStart}
                    >
                        Start
                    </button>
                    <button onClick={this.reset}
                        disabled={this.state.status === SortingStatus.InProgress}
                    >
                        Reset
                    </button>
                    <button onClick={this.iterate}
                        disabled={this.state.status === SortingStatus.Solved}
                    >
                        Iterate
                    </button>
                    <button onClick={this.pause}
                        disabled={this.state.status === SortingStatus.Solved || this.state.status === SortingStatus.OnStart}
                    >
                        {this.state.status === SortingStatus.OnPause ? 'Resume' : 'Pause'}
                    </button>
                </footer>
            </div>
        );
    }

}

export default BubbleSortMain;
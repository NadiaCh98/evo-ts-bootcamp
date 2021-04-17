import styled from "styled-components";
import { SortingItem } from "../../containers/BubbleSortMain/BubbleSortMain";

type ItemProps = Readonly<{
    at: SortingItem;
    isActive: boolean;
}>

const Item = styled.div`
    background: ${(props: ItemProps) => props.isActive ? 'red' : 'blue'};
    min-width: 1em;
    height: ${(props: ItemProps) => props.at}%;
    border: 1px solid grey;
`;

export default Item;
import React from "react";
import {PizzaPrice} from "./PizzaPrice";

interface TotalPriceProps {
    price: number;
}

export const TotalPrice = React.memo(function TotalPrice({ price }: TotalPriceProps) {
    return (
        <div className="flex">
            <span>Total price:</span><PizzaPrice price={price} />
        </div>
    );
});


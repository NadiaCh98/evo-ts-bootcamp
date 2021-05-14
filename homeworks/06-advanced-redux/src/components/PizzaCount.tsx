import React from "react";

interface PizzaCountProps {
    count: number
}

export const PizzaCount = React.memo(function PizzaCount({ count }: PizzaCountProps) {
    return  (
        <p><span className="text-yellow-400 mr-1">x</span>{count}</p>
    );
});

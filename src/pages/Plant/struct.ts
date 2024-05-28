export interface INode {
    order: number;
    children: INode[];
}

export const generateTree = (depth: number): INode => {
    if (depth === 0) {
        return { order: 1, children: [] };
    }

    const leftChild = generateTree(depth - 1);
    const rightChild = generateTree(depth - 1);

    const order =
        Math.max(leftChild.order, rightChild.order) +
        (leftChild.order === rightChild.order ? 1 : 0);

    return { order, children: [leftChild, rightChild] };
};

export interface CardData {
    rows: number;
    cols: number;
    callbackId: number;
    title: string;

    idService: string;
}

export interface GridCardData {
    title: string;
    cards: CardData[];
}

export interface UniversalSelect {
    value: number;
    viewValue: string;
}

export interface ChartJsFormatDatasets {
    label: string;
    data: number[];
    fill?: boolean;
    backgroundColor?: string;
    borderColor?: string;
}
export interface ChartJsFormat {
    labels: string[];
    datasets: ChartJsFormatDatasets[];
    lastUpdate?: string;
}

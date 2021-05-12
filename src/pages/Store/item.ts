export default interface item{
    id: string, 
    name: string,
    variations: {
        price: number,
        quantity: number,
        size: number
    }[], 
    units: string,
    image: string
}
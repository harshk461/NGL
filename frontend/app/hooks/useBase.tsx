const useBase = () => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    return baseUrl;
}
export default useBase;
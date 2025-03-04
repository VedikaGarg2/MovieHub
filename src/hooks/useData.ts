import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { CanceledError } from "axios";

interface FetchResponse<T>{
    results?: T[];
    genres?: T[];
}

const useData = <T>(endpoint: string) => {
    const [data, setData] = useState<T[]>([]);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        setLoading(true);
        apiClient
         .get<FetchResponse<T>>(endpoint, { signal: controller.signal })
         .then((res) => {
            setData(res.data.results || res.data.genres || []);
            setLoading(false);
        })
         .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message);
            setLoading(false);
        });

        return () => controller.abort();
    }, [endpoint]);
    return {data, error, isLoading};
};
export default useData;
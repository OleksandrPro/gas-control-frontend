import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { Center, Loader, Text } from "@mantine/core";
import { PageContainer } from "../components/layout/PageContainer";
import { CardDetails } from "../components/cards/CardDetails";

import { getCard } from "../api/Cards";


export const CardDetailsPage = () => {
    const { id } = useParams();

    const { data: card, isLoading, isError } = useQuery({
        queryKey: ['card', id],
        queryFn: () => getCard(Number(id)),
        enabled: !!id
    });

    if (isLoading) {
        return (
            <Center h="100vh">
                <Loader color="blue" size="xl" />
            </Center>
        );
    }

    if (isError || !card) {
        return <Text p="xl" c="red">Loading failed or Card Not Found</Text>;
    }

    return (
        <PageContainer>
            <CardDetails cardData={card} />
        </PageContainer>
    );
};
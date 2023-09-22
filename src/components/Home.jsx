import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import { Box, Heading, Img, SimpleGrid, Spinner, Text, VStack } from "@chakra-ui/react";
const style = {
    border: "1px solid green",
    margin: 6,
    padding: 8,
};

function Home() {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {

                await new Promise((resolve) => setTimeout(resolve, 2000));

                const response = await axios.get(
                    `https://63f454bc2213ed989c409c2f.mockapi.io/items?page=${currentPage}&limit=10`
                );

                const newItems = response.data;

                if (newItems.length === 0) {
                    setHasMore(false);
                } else {
                    setItems([...items, ...newItems]);
                    setCurrentPage(currentPage + 1);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [currentPage, items]);

    const fetchMoreData = () => {

    };
    return (
        <Box>
            <Heading>React-infinite-scroll-component</Heading>
            <hr />
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<Spinner speed="1s" color='blue.500' emptyColor='gray.200'/>}
                scrollThreshold={0.9}

            >
                <SimpleGrid columns={2} width="70%" margin="auto">
                    {items.map((item, index) => (
                        <VStack style={style} key={item.id}>
                            <Img src={item.image}></Img>
                            <Text>{item.name}</Text>
                            <Text>{item.description}</Text>
                        </VStack>
                    ))}
                </SimpleGrid>

            </InfiniteScroll>
        </Box>
    );
}

export default Home;

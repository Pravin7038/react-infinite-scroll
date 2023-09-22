import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";
import {
    Box,
    Heading,
    Img,
    SimpleGrid,
    Spinner,
    Text,
    VStack,
} from "@chakra-ui/react";

// Define a style object for the VStack components
const style = {
    border: "1px solid green",
    margin: 6,
    padding: 8,
};

function Home() {
    // State variables
    const [items, setItems] = useState([]); // Store the list of items
    const [currentPage, setCurrentPage] = useState(1); // Track the current page of data
    const [hasMore, setHasMore] = useState(true); // Determine if there's more data to fetch
    const [loading, setLoading] = useState(false); // Track whether data is currently being fetched

    // Function to fetch more data when the user scrolls
    const fetchMoreData = () => {
        if (loading) return; // Don't fetch data if already loading
        setLoading(true);

        // Introduce a 1-second delay before fetching more data
        setTimeout(async () => {
            try {
                const response = await axios.get(
                    `https://63f454bc2213ed989c409c2f.mockapi.io/items?page=${currentPage}&limit=10`
                );

                const newItems = response.data;

                if (newItems.length === 0) {
                    setHasMore(false); // No more data to fetch
                } else {
                    setItems([...items, ...newItems]); // Append new items to the existing list
                    setCurrentPage(currentPage + 1); // Increment the page number
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false); // Reset loading state
            }
        }, 1000); // 1-second delay
    };

    // useEffect hook to fetch initial data when the component mounts
    useEffect(() => {
        // Initial data fetch
        fetchMoreData();
    }, []);

    return (
        <Box>
            <Heading>React-infinite-scroll-component</Heading>
            <hr />
            <InfiniteScroll
                dataLength={items.length}
                next={fetchMoreData} // Function to call when more data needs to be loaded
                hasMore={hasMore} // Determines if there is more data to load
                loader={<Spinner speed="1s" color="blue.500" emptyColor="gray.200" />} // Loading spinner
                scrollThreshold={0.9} // Load more data when user scrolls to 90% of the page
            >
                <SimpleGrid columns={2} width="70%" margin="auto">
                    {/* Map over the items and display them */}
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

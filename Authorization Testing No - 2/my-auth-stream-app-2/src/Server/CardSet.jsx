import { useEffect, useState } from "react";

export default function CardSet() {
    const [username, setUsername] = useState(localStorage.getItem('username') || "");
    const [cardData, setCardData] = useState([]);

    useEffect(() => {
        if (username) {
            const fetchData = async () => {
                try {
                    console.log(`Fetching data from /Server/${username}.json`);
                    const response = await fetch(`/Server/${username}.json`);

                    if (!response.ok) {
                        throw new Error(`Failed to fetch. Status: ${response.status}`);
                    }

                    const data = await response.json();
                    setCardData(data);
                    console.log('Card data:', data); // Log the card data to the console
                } catch (err) {
                    console.error('Error fetching card data:', err); // Log any errors to the console
                }
            };

            fetchData();
        } else {
            console.warn('No username found in localStorage');
        }
    }, [username]);

    return (
        <>
            <h1>This is card set for {username}</h1>
            {/* No UI for card data, only console logs */}
        </>
    );
}

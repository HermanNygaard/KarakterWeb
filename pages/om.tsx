import React from 'react'
import { Box, Text, Image, Link } from '@chakra-ui/core'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

export default function om() {
    return (
        <div>
            <Navbar />
            <Box d="flex" color="#002245" flexDir={["column-reverse", "column-reverse", "row"]} mt={["", 50, 100]}>
                <Box fontSize="2xl" >
                    <Text color="#3f3f54" mb="5" fontWeight="bold" fontSize="4xl" textAlign="center">Om karakterweb</Text>
                    <Box ml={5} p="4">
                        <Text>Karakterweb er en webapplikasjon for å søke opp karakterstatistikk for universitetsemner.</Text>
                        <Text>Dataen er offentlig og hentes fra <Link target="_blank" href="https://nsd.no/"><Text as="u">NSD</Text></Link></Text>
                        <Link target="_blank" href="https://data.norge.no/nlod/no/2.0/"><Text as="u">Lisens for bruk</Text></Link>
                        <Text>Utviklet i React, Next.js og Chakra UI. Hostet hos Vercel. </Text>
                    </Box>
                </Box>
                <Box width={["100vw", "100vw", "50vw"]} >
                    <Image src="/group.png" />
                </Box>
            </Box>
            <Footer />
        </div >
    )
}

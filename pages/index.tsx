import { NextPage } from "next";
import Head from "next/head";
import useSWR from 'swr'
import Graph from "../components/Graph";
import Navbar from "../components/Navbar";
import { Button, Box, Input, Flex, Text, NumberInput, Image, Divider, useToast } from "@chakra-ui/core";
import Footer from "../components/Footer";
import { useState } from "react";
import { nums, grades } from "../util/sample-data"
import payload from "../services/fetchEmne"



const uniMap = {
  UiO: "1110",
  NTNU: "1150",
  OsloMet: "1175",
  UiB: "1120",
  BI: "8241"
};

const API_URL = "https://api.nsd.no/dbhapitjener/Tabeller/hentJSONTabellData";
const Home: NextPage = () => {
  const [loading, setLoading] = useState(false)
  const [emneKode, setEmneKode] = useState("IN2010");
  const [uni, setUni] = useState("UiO");
  const [results, setResults] = useState(grades["UiO"]);
  const [num, setNum] = useState(nums["UiO"]);
  const [year, setYear] = useState(new Date().getFullYear() - 1);
  const toast = useToast()

  const emneChange = (e: any) => {
    setEmneKode(e.target.value.toUpperCase());
  };

  const yearChange = (e: any) => {
    setYear(e.target.value);
  };

  const handlePost = (e: any) => {
    e.preventDefault();
    post();
  };

  const handleInstChange = (inst: string) => {
    setUni(inst);
    localStorage.setItem("inst", inst);
  };


  async function post(store = true) {
    setLoading(true);
    payload.filter[0].selection.values = [`${uniMap[uni]}`];
    if (uni === "BI") {
      // Regex for removing spaces
      payload.filter[1].selection.values = [`${emneKode.replace(/\s/g, "")}1`];
    } else {
      payload.filter[1].selection.values = [`${emneKode.replace(/\s/g, "")}-1`];
    }
    payload.filter[2].selection.values = [`${year}`];

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" }
      });
      let json;
      // Fail request
      if (res.status === 204 || !res.ok) {
        toast({
          title: "Fant ingen resultater",
          description: "Sjekk at utdanningsinstitusjonen er riktig og husk at emnekoden kan ha blitt endret i nyere tid.",
          status: "error",
          duration: 7000,
          isClosable: true,
        })
        json = [
          {
            Emnekode: "IN1010-1",
            Årstall: "2019",
            "Antall kandidater total": "0"
          }
        ];
      } else {
        json = await res.json();
      }
      setResults(json);
      let a = 0;
      json = json.map((item: any) => {
        a += Number(item["Antall kandidater totalt"]);
        return item;
      });
      setNum(a);
      setLoading(false);
    } catch (error) { }
    storeData(emneKode, year);
  }

  async function storeData(emnekode, year) {
    await fetch(`${process.env.API_URL}/api/search`, {
      method: "POST",
      body: JSON.stringify({ "code": emnekode, "year": year, timestamp: Date.now() })
    })
  }

  // const { data, error } = useSWR('/api/grades', fetcher)

  function fetcher() {
    // return fetch("f")
  }

  return (
    <>
      <Head>
        <title>Karakterweb - Karakterstatistikk ved norske universiteter som UiO, NTNU</title>
        <link rel="manifest" href="/static/manifest.json" />
        <meta name="theme-color" content="#72B340" />
        <meta
          name="description"
          content="På Karakterweb finner du karakterstatistikk for norske universiteter. UiO, NTNU, BI, OsloMet, UiB"
        />
      </Head>
      <Navbar uniChange={handleInstChange} currentUni={uni} />
      <Box textAlign={["center", "center", null]} d={["", "", "flex"]} justifyContent="flex-end" flexDir="row-reverse" >
        <Box>
          <form onSubmit={handlePost} >
            <Box mb={10} shadow="xl" p={4} rounded="lg" w={[11 / 12, "auto"]} d="inline-block">
              <Flex >
                <Input defaultValue="IN2010" onChange={emneChange} w={2 / 5} border="none" _focus={{}} borderRight="1px solid #e5e6ec" rounded="none" placeholder="Emnekode" />
                <Input onChange={yearChange} type="number" border="none" _focus={{}} defaultValue={2019} w={[2 / 6, 2 / 5]} placeholder="År" />
                <Button type="submit" isLoading={loading} w={[2 / 6, 1 / 5]} _active={{}} _hover={{}} color="white" bg="#6378fa">Søk</Button>
              </Flex>
            </Box>
          </form>
          <Graph data={results} num={num} />
        </Box>
        <Divider />
        <Image mt={[null, null, "10vh"]} h={["", "70vh"]} maxW={[null, null, "50vw", "40vw"]} pr={5} src="/talk.png" />
      </Box>
      <Footer />
    </>
  )
};

export default Home;

import {
  Box,
  HStack,
  Image,
  Text,
  Wrap,
  WrapItem,
  IconButton,
  Input,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";
import { CountryDataType } from "../types";
import { MdClose } from "react-icons/md";

export default function Home() {
  const [countryData, setCountryData] = useState<CountryDataType[]>();
  const [selectedCountry, setSelectedCountry] = useState<CountryDataType[]>();
  const [searchedCountry, setCountryName] = useState("");
  const [filteredItems, setFilteredItems] = useState<CountryDataType[]>();
  const callAPI = async () => {
    try {
      axios.get("https://restcountries.com/v2/all").then((response: any) => {
        setCountryData(response.data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAPI();
  }, []);

  useEffect(() => {
    const filteredItems = countryData?.filter((country) => {
      if (country.name.toLocaleLowerCase().includes(searchedCountry))
        return country;
    });
    //@ts-ignore
    setFilteredItems(filteredItems);
  }, [searchedCountry]);

  const handleAddCountry = (singleCountry: CountryDataType) => {
    if (selectedCountry) {
      let countryExists = selectedCountry.some(
        (country) => country.area === singleCountry.area
      );
      if (countryExists) return;
      else {
        setSelectedCountry(() => [...selectedCountry, singleCountry]);
      }
    } else {
      setSelectedCountry(new Array(singleCountry));
    }
  };

  const handleRemove = (singleCountry: CountryDataType) => {
    let newData = selectedCountry?.filter((obj) => {
      return singleCountry.area !== obj.area;
    });
    setSelectedCountry(newData);
  };

  return (
    <Box mt="40px" h="100%" w="100%" pl="420px">
      <HStack w="100%" alignItems="center" fontSize="30px" fontWeight="600">
        <Text>Country Picker</Text>
      </HStack>
      <Text pl="10px" alignSelf="center" fontWeight="600" mt="150px" pb="10px">
        Search Country
      </Text>

      <Wrap mt="15px" mb="15px">
        {selectedCountry?.map((country: CountryDataType) => (
          <WrapItem pr="2" key={country.alpha2Code}>
            <HStack py="1" px="2" borderRadius="4" bg="blackAlpha.200">
              <Image src={country.flags.png} boxSize="20px" />
              <Text fontWeight="bold" fontSize="sm" color="blue.600">
                {country.name}
              </Text>
              <IconButton
                aria-label="remove co-author"
                variant="ghost"
                colorScheme="blackAlpha"
                size="xs"
                icon={<MdClose fontSize="1rem" />}
                onClick={() => handleRemove(country)}
              />
            </HStack>
          </WrapItem>
        ))}
      </Wrap>

      <Menu closeOnSelect={false}>
        <MenuButton
          w="230px"
          textAlign="left"
          as={Button}
          rightIcon={<AiFillCaretDown />}
          mt="-10px"
        >
          {searchedCountry.length > 0 ? "Searched Countries" : "All Countries"}
        </MenuButton>

        {countryData && (
          <MenuList 
            maxH="350px"
            minW="0px"
            w="230px"
            sx={{ overflow: "scroll" }}
          >
            <HStack>
              <Input
                placeholder="Type country name here"
                value={searchedCountry}
                onChange={(e) => {
                  setCountryName(e.target.value), e.stopPropagation();
                }}
                maxW="230px"
              ></Input>
            </HStack>
            {searchedCountry.length > 0
              ? filteredItems &&
                filteredItems.map((obj: CountryDataType, index: number) => {
                  return (
                    <MenuItem key={index} onClick={() => handleAddCountry(obj)}>
                      <HStack>
                        <Image src={obj.flags.png} boxSize="20px" mr="6px" />
                        <Text>{obj.name}</Text>
                      </HStack>
                    </MenuItem>
                  );
                })
              : countryData.map((obj: CountryDataType, index: number) => {
                  return (
                    <MenuItem key={index} onClick={() => handleAddCountry(obj)}>
                      <HStack>
                        <Image src={obj.flags.png} boxSize="20px" mr="6px" />
                        <Text>{obj.name}</Text>
                      </HStack>
                    </MenuItem>
                  );
                })}
          </MenuList>
        )}
      </Menu>
    </Box>
  );
}

import { TbBeach, TbPool } from "react-icons/tb";
import { FaCity } from "react-icons/fa6";
import {
  PiBathtubFill,
  PiCoatHangerFill,
  PiTelevisionFill,
} from "react-icons/pi";
import {
  FaShower,
  FaFireExtinguisher,
  FaUmbrellaBeach,
} from "react-icons/fa";
import { MdMicrowave,MdYard, MdPets } from "react-icons/md";
import { AiFillCar } from "react-icons/ai";
import {
  GiHeatHaze,
  GiCctvCamera,
  GiToaster,
  GiCampfire,
} from "react-icons/gi";
import {
  BiSolidWasher,
  BiSolidDryer,
  BiSolidFirstAid,
  BiWifi,
  BiSolidFridge,
} from "react-icons/bi";
import { BsSnow} from "react-icons/bs";

export const places = [
  {
    img: "assets/charminar.jpeg",
    label: "hyderabad",
    icon: <FaCity />,
  },
  {
    img: "assets/delhi.jpeg",
    label: "delhi",
    icon: <FaCity />,
  },
  {
    img: "assets/chennai.jpeg",
    label: "beach",
    icon: <TbBeach />,
  },
  {
    img: "assets/mumbai.jpeg",
    label: "mumbai",
    icon: <FaCity />,
  },
  {
    img: "assets/vizag.jpeg",
    label: "vizag",
    icon: <TbPool />,
  },
];
export const facilities = [
  {
    name: "Bath tub",
    icon: <PiBathtubFill />,
  },
  {
    name: "Outdoor shower",
    icon: <FaShower />,
  },
  {
    name: "Washer",
    icon: <BiSolidWasher />,
  },
  {
    name: "Dryer",
    icon: <BiSolidDryer />,
  },
  {
    name: "Hangers",
    icon: <PiCoatHangerFill />,
  },
  {
    name: "TV",
    icon: <PiTelevisionFill />,
  },
  {
    name: "Air Conditioning",
    icon: <BsSnow />,
  },
  {
    name: "Heating",
    icon: <GiHeatHaze />,
  },
  {
    name: "Security cameras",
    icon: <GiCctvCamera />,
  },
  {
    name: "Fire extinguisher",
    icon: <FaFireExtinguisher />,
  },
  {
    name: "First Aid",
    icon: <BiSolidFirstAid />,
  },
  {
    name: "Wifi",
    icon: <BiWifi />,
  },

  {
    name: "Refrigerator",
    icon: <BiSolidFridge />,
  },
  {
    name: "Microwave",
    icon: <MdMicrowave />,
  },
  {
    name: "Stove",
    icon: <GiToaster />,
  },
  {
    name: "Outdoor dining area",
    icon: <FaUmbrellaBeach />,
  },
  {
    name: "Camp fire",
    icon: <GiCampfire />,
  },
  {
    name: "Garden",
    icon: <MdYard />,
  },
  {
    name: "Free parking",
    icon: <AiFillCar />,
  },
  {
    name: " Pet allowed",
    icon: <MdPets />
  }
];

import { Business } from "@/types";
import { v4 as uuidv4 } from 'uuid';

export const mockRestaurants: Business[] = [
  {
    id: uuidv4(),
    name: "Ristorante Bella Italia",
    category: "restaurants",
    owner: "Maria Rossi",
    email: "info@bellaitalia.de",
    phone: "+49 30 12345678",
    address: "Hauptstraße 123, 10115 Berlin",
    url: "https://bellaitalia-restaurant.de",
    postalCode: "10115"
  },
  {
    id: uuidv4(),
    name: "Sushi Palace",
    category: "restaurants",
    owner: "Takashi Yamamoto",
    email: "kontakt@sushipalace.de",
    phone: "+49 30 87654321",
    address: "Friedrichstraße 45, 10117 Berlin",
    url: "https://sushipalace.de",
    postalCode: "10117"
  },
  {
    id: uuidv4(),
    name: "Brauhaus am Markt",
    category: "restaurants",
    owner: "Hans Müller",
    email: "info@brauhaus-markt.de",
    phone: "+49 30 23456789",
    address: "Marktplatz 7, 10178 Berlin",
    url: "https://brauhaus-markt.de",
    postalCode: "10178"
  },
  {
    id: uuidv4(),
    name: "Curry 36",
    category: "restaurants",
    owner: "Michael Schmidt",
    email: "bestellung@curry36.de",
    phone: "+49 30 34567890",
    address: "Mehringdamm 36, 10961 Berlin",
    url: "https://curry36.de",
    postalCode: "10961"
  },
  {
    id: uuidv4(),
    name: "Viet Village",
    category: "restaurants",
    owner: "Nguyen Van",
    email: "hello@vietvillage.de",
    phone: "+49 30 45678901",
    address: "Kantstraße 55, 10625 Berlin",
    url: "https://vietvillage-restaurant.de",
    postalCode: "10625"
  },
  {
    id: uuidv4(),
    name: "Pizza Express",
    category: "restaurants",
    owner: "Luigi Romano",
    email: "info@pizzaexpress.de", 
    phone: "+49 470 1234567",
    address: "Hauptstraße 42, 47051 Duisburg",
    url: "https://pizza-express-duisburg.de",
    postalCode: "47051"
  },
  {
    id: uuidv4(),
    name: "Gasthaus zur Mühle",
    category: "restaurants",
    owner: "Franz Weber",
    email: "reservierung@gasthaus-muehle.de",
    phone: "+49 471 7654321",
    address: "Mühlenweg 8, 47198 Duisburg",
    url: "https://gasthaus-muehle.de",
    postalCode: "47198"
  }
];

export const mockHotels: Business[] = [
  {
    id: uuidv4(),
    name: "Grand Hotel Berlin",
    category: "hotels",
    owner: "Klaus Schmidt",
    email: "reception@grandhotelberlin.de",
    phone: "+49 30 56789012",
    address: "Unter den Linden 10, 10117 Berlin",
    url: "https://grandhotel-berlin.de",
    postalCode: "10117"
  },
  {
    id: uuidv4(),
    name: "City Park Hotel",
    category: "hotels",
    owner: "Thomas Meyer",
    email: "info@cityparkhotel.de",
    phone: "+49 30 67890123",
    address: "Tiergarten Allee 22, 10785 Berlin",
    url: "https://cityparkhotel.de",
    postalCode: "10785"
  },
  {
    id: uuidv4(),
    name: "Boutique Hotel Kreuzberg",
    category: "hotels",
    owner: "Sarah Wagner",
    email: "stay@boutiquekreuzberg.de",
    phone: "+49 30 78901234",
    address: "Oranienstraße 83, 10969 Berlin",
    url: "https://boutique-kreuzberg.de",
    postalCode: "10969"
  },
  {
    id: uuidv4(),
    name: "Hotel am Hafen",
    category: "hotels",
    owner: "Peter Fischer",
    email: "info@hotelamhafen.de",
    phone: "+49 470 9876543",
    address: "Hafenstraße 15, 47119 Duisburg",
    url: "https://hotel-am-hafen.de",
    postalCode: "47119"
  }
];

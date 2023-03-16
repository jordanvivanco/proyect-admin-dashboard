import { Typography, Button, Box, Divider, Modal, ListItem, Stack, Card, CardContent, CardMedia, CardHeader, CardActions } from '@mui/material';
import { SignIn } from '../../components/Sign/SignIn';
import { useContext, useState } from "react";
import { UserContext, UserProps } from "../../context/UserContext";

export const Landing = () => {
  const descriptions1: string[] = [
    "100% Trained Instructor",
    "Vehicle A1 sedan model",
    "Vehicle with manual or automatic transmission",
    "A1 question ballot"]
  const descriptions2: string[] = [
    "100% Trained Instructor",
    "Vehicle A1 sedan model",
    "Vehicle with manual or automatic transmission",
    "A1 question ballot",
    "Virtual traffic signaling classes"]
  const descriptions3: string[] = [
    "100% Trained Instructor",
    "Vehicle A1 sedan model",
    "Vehicle with manual or automatic transmission",
    "A1 question ballot",
    "Virtual traffic signaling classes",
    "Extended driving hours",
    "Choose your instructor"]
  const packages: Package[] = [
    { name: "Hours", description: "", features: descriptions1, price: 39 },
    { name: "Full", description: "", features: descriptions2, price: 669 },
    { name: "Premium", description: "", features: descriptions2, price: 879 }
  ]

  const { user, setUser } = useContext<UserProps>(UserContext);
  const [open, setOpen] = useState(false);
  const [exist, setExist] = useState(false);
  const handleOpen = (exsit: boolean) => { setOpen(true); setExist(exsit); setUser(true)};
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "550px"
  }

  return (
    <Box>
      <Modal
        open={open}
        onClose={() => handleClose()}>
        <Box sx={style}>
          <SignIn exist={exist}></SignIn>
        </Box>

      </Modal>
      <Box sx={{
        background: "black",
        width: "100%",
        paddingBottom: "50px",
        backgroundSize: "cover"
      }}>
        <Box sx={{ position: "fixed", top: 0, left: 0, width: "100%", height: 70, background: "rgb(140,140,140, 0.6)", backdropFilter: "blur(10px)", boxShadow: "0px 0px 15px rgb(0,0,0,0.2)", display: "grid", gridTemplateRows: "70px", paddingTop: "20px" }}>
          <Box>
            <Typography sx={{ paddingLeft: "20px", fontWeight: "bold", color: "rgb(250,250,250)" }} variant="h6">DCLICENSE</Typography>
          </Box>
          <Box sx={{ position: "absolute", right: "10px", top: "18px" }}>
            <Button
              onClick={() => handleOpen(false)}
              sx={{
                border: "solid 1px white",
                color: "white",
                "&:hover": {
                  color: "white",
                  border: "solid 1px white"
                }
              }} variant="outlined">Register</Button>
            <Button
              onClick={() => handleOpen(true)}
              sx={{
                background: "white",
                color: "black",
                "&:hover": {
                  color: "black",
                  background: "white"
                }
              }} variant="contained">Log In</Button>
          </Box>
        </Box>
        <Box sx={{ paddingTop: "100px" }}>
          <h1 style={{ fontSize: 100, color: "white", marginLeft: "20px" }}><b>DCLICENSE</b></h1>
          <Typography variant="h1" gutterBottom sx={{ color: "white", marginLeft: "20px" }}>
            DRIVE CIRCUIT
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ color: "rgb(200,200,200)", marginLeft: "20px" }}>
            WE ARE YOUR BEST CHOICE. GET YOUR LICENSE IN LESS THAN 6 MONTHS.
          </Typography>
        </Box>
      </Box>
      <Box>
        <div style={{ paddingTop: "100px", paddingBottom: "100px" }} className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">See your performance on a dashboard</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            You can see your performance, packages purchased, driving hours, instructors and much more access now
          </p>
        </div>
      </Box>
      <Divider>Payment plans</Divider>
      <Box>
        <CardPricing packages={packages} />
      </Box>
      <Box sx={{ paddingBottom: "100px" }}>
        <center>
          <Card sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", width: "90%" }}>
            <CardMedia>
              <iframe style={{ width: "100%", height: "320px" }} src="https://www.youtube.com/embed/8qMUK-QUYWc" title="Examen de manejo A1 - 2020 | Ruta &#39;A&#39;  Touring Lima" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
            </CardMedia>
            <CardContent>
              <Typography sx={{ paddingBottom: "30px" }} variant="h4">We teach you to drive from 0</Typography>
              <Typography variant="h6">
                You will learn to drive with A1 sedan model cars, traffic rules, signaling and driving skills
              </Typography>
              <Button variant="contained">to subscribe</Button>
            </CardContent>
          </Card>
        </center>
      </Box>
      <Divider>Footer</Divider>
      <Box sx={{ height: "50px", width: "100%", textAlign: "center" }}>
        <center>
          <Box sx={{ width: "600px", paddingTop: "100px" }}>
            <Stack direction="row">
              <ListItem sx={{ color: "rgb(150,150,150)", fontWeight: "bold" }}>About</ListItem>
              <ListItem sx={{ color: "rgb(150,150,150)", fontWeight: "bold" }}>Blog</ListItem>
              <ListItem sx={{ color: "rgb(150,150,150)", fontWeight: "bold" }}>Jobs</ListItem>
              <ListItem sx={{ color: "rgb(150,150,150)", fontWeight: "bold" }}>Accessibility</ListItem>
              <ListItem sx={{ color: "rgb(150,150,150)", fontWeight: "bold" }}>Patners</ListItem>
            </Stack>
          </Box>
          <Box sx={{ paddingTop: "20px", paddingBottom: "20px", width: "300px", display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
            <i className="bi bi-facebook" style={{ fontSize: "18px", color: "rgb(150,150,150)" }}></i>
            <i className="bi bi-instagram" style={{ fontSize: "18px", color: "rgb(150,150,150)" }}></i>
            <i className="bi bi-telephone" style={{ fontSize: "18px", color: "rgb(150,150,150)" }}></i>
            <i className="bi bi-whatsapp" style={{ fontSize: "18px", color: "rgb(150,150,150)" }}></i>
          </Box>
          <Box sx={{ paddingBottom: "70px" }}>
            <Typography sx={{ color: "rgb(150,150,150)", fontSize: "14px", fontWeight: "bold" }}>©{new Date().getFullYear()} D.C.License - D.C.L, Inc. All rights reserved.</Typography>
          </Box>
        </center>
      </Box>
    </Box>
  )
}

interface Package {
  name: string;
  description: string;
  features: string[];
  price: number
}

type PropsPricing = {
  packages: Package[]
}

export const CardPricing: React.FC<PropsPricing> = ({ packages }) => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Simple no-tricks pricing</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Acquire your membership, we adjust to all kinds of budgets, economical (hourly membership) even better opt for the package (Full Time Membership)
          </p>
        </div>

        {
          packages.map((pack: Package) => (
            <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none" key={pack.name}>
              <div className="p-8 sm:p-10 lg:flex-auto">
                <h3 className="text-2xl font-bold tracking-tight text-gray-900">{pack.name} membership</h3>
                <p className="mt-6 text-base leading-7 text-gray-600">
                  {pack.description}
                </p>
                <div className="mt-10 flex items-center gap-x-4">
                  <h4 className="flex-none text-sm font-semibold leading-6 text-indigo-600">What’s included</h4>
                  <div className="h-px flex-auto bg-gray-100" />
                </div>
                <ul
                  role="list"
                  className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
                >
                  {pack.features.map((feature: string) => (
                    <li key={feature} className="flex gap-x-3">
                      <i className="bi bi-check-lg" style={{ color: "gree", fontSize: "24px" }}></i>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                <div className="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16">
                  <div className="mx-auto max-w-xs px-8">
                    <p className="text-base font-semibold text-gray-600">Pay once, own it forever</p>
                    <p className="mt-6 flex items-baseline justify-center gap-x-2">
                      <span className="text-5xl font-bold tracking-tight text-gray-900">${pack.price}</span>
                      <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">USD</span>
                    </p>
                    <a
                      href="#"
                      className="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Get access
                    </a>
                    <p className="mt-6 text-xs leading-5 text-gray-600">
                      Invoices and receipts available for easy company reimbursement
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}


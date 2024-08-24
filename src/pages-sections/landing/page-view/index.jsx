"use client";

import { useState } from "react";
import Box from "@mui/material/Box"; 

import { LoginPageView } from "pages-sections/sessions/page-view";
import AuthLayout from "pages-sections/sessions/layout";

export default function IndexPageView() {
  const [filterDemo, setFilterDemo] = useState("");

  const handleChangeFilter = value => setFilterDemo(value);

  return <Box id="top" overflow="hidden" bgcolor="background.paper">
    <AuthLayout>
    <LoginPageView/>
    </AuthLayout>
    
    </Box>;
}
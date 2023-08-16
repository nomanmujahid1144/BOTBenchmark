import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";


import { Index } from "./components/ui/major-components/Index";
import { SignIn } from "./components/ui/major-components/credentials/SignIn";
import { SignUp } from "./components/ui/major-components/credentials/SignUp";
import { ResetPassword } from "./components/ui/major-components/credentials/resetPassword";
import { ChangePassword } from "./components/ui/major-components/credentials/ChangePassword";
import { AllCategories } from "./components/ui/major-components/category-page/AllCategories";
import { Filters } from "./components/ui/minor-components/filters/Filter";
import { SoftwarePage } from "./components/ui/major-components/software/SoftwarePage";
import { Blogs } from "./components/ui/major-components/blogs/Blog";
import { Checkout } from "./components/ui/major-components/cart/Checkout";
import { Evaluation } from "./components/ui/major-components/evaluation/Evaluate";
import { WriteReview } from "./components/ui/minor-components/ratings/WriteReview";
import { Contacts } from "./components/ui/major-components/contacts/Contact";
import { AboutUs } from "./components/ui/major-components/about-us/AboutUs";
import { FAQ } from "./components/ui/major-components/faqs/FAQ";

import "./components/fontawesomeIcons"

function App() {
  return (
      <Layout >
        <Routes >
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/confirm-password/:token" element={<ChangePassword />} />
          <Route path="/categories" element={<AllCategories />} />
          <Route path="/categories/:category" element={<Filters />} />
          <Route path="/review/:softwareId/:softwareName" element={<SoftwarePage  />} />
          <Route path="/write-review/:softwareId/:softwareName" element={<WriteReview  />} />
          <Route path="/evaluate/:spftwareId/:softwareName" element={<Evaluation />} />
          <Route path="/contact-us" element={<Contacts />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faqs" element={<FAQ />} />
          {/* <Route path="/blogs" element={<Blogs />} /> */}
        </Routes>
      </Layout>
  );
}

export default App;
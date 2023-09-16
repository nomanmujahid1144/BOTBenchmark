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
import { Evaluation } from "./components/ui/major-components/evaluation/Evaluate";
import { WriteReview } from "./components/ui/minor-components/ratings/WriteReview";
import { Contacts } from "./components/ui/major-components/contacts/Contact";
import { AboutUs } from "./components/ui/major-components/about-us/AboutUs";
import { FAQ } from "./components/ui/major-components/faqs/FAQ";
import { Pricing } from "./components/ui/major-components/pricing/Pricing";
import { SuccessPage } from "./components/ui/major-components/extra-pages/SuccessPage";
import { NotFound } from "./components/ui/major-components/extra-pages/404";
import { ProfileSetting } from "./components/ui/major-components/profile/ProfileSetting";
import { UserReviews } from "./components/ui/major-components/profile/UserReviews";
import { UserSoftware } from "./components/ui/major-components/profile/UserSoftwares";

import "./components/fontawesomeIcons"

function App() {
  return (
      <Routes >
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<Index />} />
          <Route path="/confirm-password/:token" element={<ChangePassword />} />
          <Route path="/profile/setting" element={<ProfileSetting />} />
          <Route path="/profile/reviews" element={<UserReviews />} />
          <Route path="/profile/mysoftwares" element={<UserSoftware />} />
          <Route path="/categories" element={<AllCategories />} />
          <Route path="/categories/:category" element={<Filters />} />
          <Route path="/review/:softwareId/:softwareName" element={<SoftwarePage  />} />
          <Route path="/write-review/:softwareId/:softwareName" element={<WriteReview  />} />
          <Route path="/evaluate/:spftwareId/:softwareName" element={<Evaluation />} />
          <Route path="/botscore/upgrade/:softwareId/:softwareName" element={<Pricing />} />
          <Route path="/transection" element={<SuccessPage />} />
          <Route path="/contact-us" element={<Contacts />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/faqs" element={<FAQ />} />
        </Route>    
      </Routes>
  );
}

export default App;

import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Yup from "yup";

import HeaderWithThreeBtn from "../components/HeaderWithThreeBtn";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingsApi from "../api/listings";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  // price: Yup.number().required().min(1).max(10000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  // images: Yup.array().min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "shower",
    label: "Bathroom",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "broom",
    label: "Cleaning",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "dome-light",
    label: "Decorating",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "light-switch",
    label: "Electrical",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "floor-plan",
    label: "Floors",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "glass-pint-outline",
    label: "Kitchens",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "format-paint",
    label: "Painting",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "bug",
    label: "Pests",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "pipe",
    label: "Plumbing",
    value: 9,
  },
];

function ListingEditScreen({ navigation, route }) {
  const location = useLocation();
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [searchState, setSearchState] = useState(false);

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    setUploadVisible(true);
    const result = await listingsApi.addListing(
      { ...listing, location },
      (progress) => setProgress(progress)
    );

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }

    resetForm();
  };

  return (
    <View style={styles.MainWrapper}>
      <HeaderWithThreeBtn headerText={'Lists'}
        searchValue={searchState}
        rightMenuPress={() => navigation.openDrawer()}
        backPress={() => navigation.pop()}
        searchPress={() => setSearchState(!searchState)} />
    <Screen style={styles.container}>
      <UploadScreen
        onDone={() => setUploadVisible(false)}
        progress={progress}
        visible={uploadVisible}
      />
      <Form
        initialValues={{
          title: "",
          price: "",
          description: "",
          category: null,
          images: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {/* <FormImagePicker name="images" /> */}
        <FormField maxLength={255} name="title" placeholder="Title" />
        {/* <FormField
          keyboardType="numeric"
          maxLength={8}
          name="price"
          placeholder="Price"
          width={120}
        /> */}
        <Picker
          items={categories}
          name="category"
          numberOfColumns={3}
          PickerItemComponent={CategoryPickerItem}
          placeholder="Category"
          width="50%"
        />
        <FormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />
        <SubmitButton title="Add List" />
      </Form>
    </Screen>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  MainWrapper: {
    flex: 1,
  }
});
export default ListingEditScreen;

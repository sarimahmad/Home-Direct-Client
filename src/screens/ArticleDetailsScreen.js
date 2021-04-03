import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  SectionList,
} from "react-native";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

// This is just for demo purposes. 
// the data should be pulled from the data/toolsList and data/materialsList (server side code)
const toolsList = [
  { id: 2, title: 'Drill bits' },
  { id: 3, title: 'Electrical tape' },
  { id: 17, title: 'Stud finder' },
];

const materialsList = [
  { id: 1, title: 'Drywall screws' },
  { id: 4, title: 'Putty' },
  { id: 5, title: 'Wood shims' },
];

function ListingDetailsScreen({ route }) {
  const listing = route.params;

  return (
    // ** this produces an error (Virtualized lists should never be nested inside plain ScrollViews...) 
    // and should be fixed 
    <ScrollView style={styles.container}>
    {/* <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    > */}
      <Image
        style={styles.image}
        preview={{ uri: listing.images[0].thumbnailUrl }}
        tint="light"
        uri={listing.images[0].url}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{listing.title}</Text>
        <Text style={styles.time}>Time: {listing.time}</Text>
         <Text style={styles.description}>{listing.description}</Text>
        {/* <View style={styles.userContainer}> */}
          {/* <ListItem
            image={require("../assets/joseph.jpg")}
            title="Joseph"
            subTitle="5 Listings"
          /> */}
        {/* </View> */}
        {/* <ContactSellerForm listing={listing} /> */}
        
      </View>
            {/* This is just for demo purposes. Each recipe/article needs it's own, unique list */}
          <View style={styles.infoContainer}>
            <SectionList 
              sections={[
                { title: 'Tools', data: toolsList },
                { title: 'Materials', data: materialsList },
              ]}
              renderItem={({ item }) => (
                <View style={styles.item}>
                  <Text>{item.title}</Text>
                </View>
                )}
                renderSectionHeader={( { section }) => (
                  <View style={styles.sectionHeader}>
                  <Text>{section.title}</Text>
                </View>
                )}
                keyExtractor={(item) => item.id}
            />
          </View>
    {/* </KeyboardAvoidingView> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  description: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  time: {
    color: colors.secondary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
  },
  userContainer: {
    marginVertical: 40,
  },
    sectionHeader: {
    backgroundColor: '#efefef',
    paddingHorizontal: 20,
    paddingVertical: 10
  },
    item: {
    paddingHorizontal: 20,
    paddingVertical: 5
  },
});

export default ListingDetailsScreen;

import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SectionList,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "../components/Text";
import HeaderWithThreeBtn from "../components/HeaderWithThreeBtn";
import { SCREEN } from "../config/Constant";

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

function ListingDetailsScreen({ route, navigation }) {
  const listing = route.params.item;
  const [searchState, setSearchState] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  return (
    // ** this produces an error (Virtualized lists should never be nested inside plain ScrollViews...) 
    // and should be fixed 
    <View style={styles.WrapperView}>
      <ScrollView style={styles.container}>
        {/* <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    > */}
        <HeaderWithThreeBtn headerText={route.params?.name}
          searchValue={searchState}
          rightMenuPress={() => navigation.openDrawer()}
          backPress={() => navigation.pop()}
          searchPress={() => setSearchState(!searchState)} />
        <View style={styles.imageWrapper}>
          <Image
            style={styles.image}
            // source={{ uri: listing.images[0].url }}
            source={{ uri: 'http://localhost:9000/assets/shoes1_full.jpg' }}
          />
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.subTitle}>{'Family Handyman'}</Text>
          <View style={styles.timeWrapper}>
            <Image source={require('../assets/timer.png')} style={styles.Icon} />
            <Text style={styles.time}>{listing.time} hours</Text>
          </View>
        </View>
        <View style={styles.rowView}>
          <TouchableOpacity style={[styles.flex1View, { backgroundColor: '#e03c1f' }]} activeOpacity={0.8}>
            <Text style={[styles.switchText, { color: 'white' }]}>List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.flex1View} activeOpacity={0.8}>
            <Text style={styles.switchText}>How To Article</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
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
            renderSectionHeader={({ section }) => (
              <View style={styles.sectionHeader}>
                <Text>{section.title}</Text>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        {/* </KeyboardAvoidingView> */}
      </ScrollView>
      <TouchableOpacity style={styles.AbsoluteAddBtn} activeOpacity={0.8} onPress={() => setAddModalVisible(true)} >
        <MaterialIcons name="add" color={colors.white} size={30} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={addModalVisible}
        onRequestClose={() => {
          setAddModalVisible(false)
        }}>
        <TouchableOpacity style={styles.ModalMainView} activeOpacity={0.95} onPress={() => setAddModalVisible(false)}>
          <TouchableOpacity style={styles.ModalBottomView} activeOpacity={1}>
            <View style={styles.TopDividerView}>
              <Text style={styles.TopDividerText}>----</Text>
            </View>
            <TouchableOpacity style={styles.ModalItemWrapper} activeOpacity={0.8} onPress={() => {
              setAddModalVisible(false)
              navigation.navigate('AddProject', { type: 'all', toolsList, materialsList, listing })
            }}>
              <View style={styles.AddWrapper}>
                <Text style={styles.AddTecxt}>+</Text>
              </View>
              <Text style={styles.ItemText}> Add all</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ModalItemWrapper} activeOpacity={0.8} onPress={() => {
              setAddModalVisible(false)
              navigation.navigate('AddProject', { type: 'tool', toolsList , listing})
            }}>
              <View style={styles.AddWrapper}>
                <Text style={styles.AddTecxt}>+</Text>
              </View>
              <Text style={styles.ItemText}> Add tools</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ModalItemWrapper} activeOpacity={0.8} onPress={() => {
              setAddModalVisible(false)
              navigation.navigate('AddProject', { type: 'material', materialsList , listing})
            }}>
              <View style={styles.AddWrapper}>
                <Text style={styles.AddTecxt}>+</Text>
              </View>
              <Text style={styles.ItemText}> Add material</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {
    padding: 20,
  },
  WrapperView: {
    flex: 1,
  },
  description: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 10,
  },
  imageWrapper: {
    width: "100%",
    height: 200,
    justifyContent: 'flex-end',
  },
  image: {
    width: "100%",
    height: '100%',
    position: 'absolute',
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    color: colors.white,
    marginLeft: 5,
  },
  subTitle: {
    fontSize: 14,
    color: colors.white,
    marginVertical: 5,
    marginLeft: 5,
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
  timeWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
  },
  Icon: {
    height: 15,
    width: 15,
    resizeMode: 'contain',
    marginRight: 5,
  },
  time: {
    color: colors.white,
    fontSize: 13,
  },
  rowView: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: 'rgba(200, 206, 206, 1)',
  },
  flex1View: {
    flex: 1,
    justifyContent: 'center',
  },
  switchText: {
    fontSize: 18,
    color: 'rgba(0, 0, 0, 1)',
    marginLeft: 10,
  },
  AbsoluteAddBtn: {
    height: 40,
    width: 40,
    position: 'absolute',
    bottom: 50,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#e03c1f',
  },
  AddBtnTxt: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  ModalMainView: {
    height: SCREEN.height,
    width: SCREEN.width,
    justifyContent: 'flex-end'
  },
  ModalBottomView: {
    height: SCREEN.height / 2,
    width: SCREEN.width,
    backgroundColor: colors.white,
  },
  TopDividerView: {
    height: 20,
    width: '100%',
    backgroundColor: 'rgba(142,142,142,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  TopDividerText: {
    color: 'white',
  },
  ModalItemWrapper: {
    height: 40,
    paddingLeft: 15,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  AddWrapper: {
    borderRadius: 15,
    height: 25,
    width: 25,
    padding: 5,
    borderWidth: 2,
    borderColor: 'rgba(142,142,142,1)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  AddTecxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'rgba(142,142,142,1)',
    position: 'absolute',
  },
  ItemText: {
    fontSize: 14,
    color: 'rgba(160,160,160,1)',
    marginLeft: 10,
    fontWeight: '600',
  }
});

export default ListingDetailsScreen;

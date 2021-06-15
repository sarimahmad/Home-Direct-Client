import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Modal, TouchableOpacity, View, Text } from "react-native";
import { SimpleLineIcons, AntDesign, MaterialIcons } from "@expo/vector-icons";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import CardList from "../components/CardList";
import HeaderWithThreeBtn from "../components/HeaderWithThreeBtn";
import { SCREEN } from "../config/Constant";

const toolsList = [
  { id: 2, title: 'Drill bits', qty: 4 },
  { id: 3, title: 'Electrical tape', qty: 2  },
  { id: 17, title: 'Stud finder', qty: 1  },
];

const materialsList = [
  { id: 1, title: 'Drywall screws', qty: 2 },
  { id: 4, title: 'Putty', qty: 3},
  { id: 5, title: 'Wood shims', qty: 4},
];

function ListingsScreen({ navigation, route }) {
  const getListingsApi = useApi(listingsApi.getListings);
  const [searchState, setSearchState] = useState(false);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  useEffect(() => {
    getListingsApi.request();
  }, []);

  return (
    <>
      <HeaderWithThreeBtn headerText={'Lists'}
        searchValue={searchState}
        rightMenuPress={() => navigation.openDrawer()}
        backPress={() => navigation.navigate('Artic')}
        searchPress={() => setSearchState(!searchState)} />
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <AppText>Couldn't retrieve the listings.</AppText>
            <Button title="Retry" onPress={getListingsApi.request} />
          </>
        )}
        <FlatList
          data={getListingsApi.data}
          keyExtractor={(listing) => listing.id.toString()}
          renderItem={({ item }) => (
            <CardList
              title={item.title}
              subTitle={"$" + item.price}
              category={'Family Handmad'}
              imageUrl={item.images[0].url}
              optionSelected={() => {
                setOptionModalVisible(true)
                setSelectedItem(item)
              }}
              onPress={() => navigation.navigate('ToolsMaterial', { type: 'all', materialsList, toolsList, listing: item })}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
        />
      </Screen>
      <TouchableOpacity style={styles.AbsoluteAddBtn} onPress={() => navigation.navigate('AddNewList')} activeOpacity={0.8}>
        <MaterialIcons name="add" color={colors.white} size={30} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={optionModalVisible}
        onRequestClose={() => {
          setOptionModalVisible(false)
        }}>
        <TouchableOpacity style={styles.ModalMainView} activeOpacity={0.95} onPress={() => setOptionModalVisible(false)}>
          <TouchableOpacity style={styles.ModalBottomView} activeOpacity={1}>
            <View style={styles.TopDividerView}>
              <Text style={styles.TopDividerText}>----</Text>
            </View>
            <TouchableOpacity style={styles.ModalItemWrapper} activeOpacity={0.8} onPress={() => {
              setOptionModalVisible(false);
              navigation.navigate('ToolsMaterial', { type: 'all', materialsList, toolsList, listing: selectedItem })
            }} >
              <View style={styles.AddWrapper}>
                <SimpleLineIcons name="eye" color={'grey'} size={20} />
              </View>
              <Text style={styles.ItemText}> View list</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.ModalItemWrapper} activeOpacity={0.8} onPress={() => {
              setOptionModalVisible(false);
              setDeleteModalVisible(true);
            }}>
              <View style={styles.AddWrapper}>
                <AntDesign name="delete" color={'grey'} size={20} />
              </View>
              <Text style={styles.ItemText}> Delete list</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => {
          setDeleteModalVisible(false)
        }}>
        <TouchableOpacity style={styles.ModalMainView2} activeOpacity={0.95} onPress={() => setDeleteModalVisible(false)}>
          <TouchableOpacity style={styles.ModalBottomView2} activeOpacity={1}>
            <View style={styles.DeleteView}>
              <Text style={styles.AddTecxt}>Delete List</Text>
              <Text style={styles.ItemText, { marginTop: 15 }}>You can't undo this action</Text>
              <View style={styles.ReverseRowView}>
                <TouchableOpacity activeOpacity={0.8} style={styles.YesBtn} onPress={() => setDeleteModalVisible(false)}>
                  <Text style={[styles.BtnText]}>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} style={styles.NoBtn} onPress={() => setDeleteModalVisible(false)}>
                  <Text style={[styles.BtnText, { color: 'black' }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  ModalMainView: {
    height: SCREEN.height,
    width: SCREEN.width,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  ModalMainView2: {
    height: SCREEN.height,
    width: SCREEN.width,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)'
  },
  ModalBottomView: {
    height: SCREEN.height / 2,
    width: SCREEN.width,
    backgroundColor: colors.white,
  },
  ModalBottomView2: {
    height: 150,
    width: SCREEN.width,
    borderRadius: 10,
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  AddTecxt: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'rgba(142,142,142,1)',
  },
  ItemText: {
    fontSize: 14,
    color: 'rgba(160,160,160,1)',
    marginLeft: 10,
    fontWeight: '600',
  },
  DeleteView: {
    width: '95%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
  },
  ReverseRowView: {
    width: '100%',
    height: 40,
    alignItems: 'center',
    flexDirection: 'row-reverse',
    marginTop: 20,
  },
  YesBtn: {
    backgroundColor: colors.primary,
    height: 35,
    paddingHorizontal: 19,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  BtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.white,
  },
  NoBtn: {
    backgroundColor: colors.white,
    height: 35,
    paddingHorizontal: 19,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
  },
  AbsoluteAddBtn: {
    height: 40,
    width: 40,
    position: 'absolute',
    bottom: 40,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: '#e03c1f',
  },
});

export default ListingsScreen;

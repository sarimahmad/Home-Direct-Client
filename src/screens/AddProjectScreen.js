import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  FlatList,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import HeaderWithThreeBtn from "../components/HeaderWithThreeBtn";
import { SCREEN } from "../config/Constant";

var listOfProj = []

function AddProjectScreen({ route, navigation }) {
  listOfProj = []
  listOfProj.push(route.params)
  const [searchValue, setSearchValue] = useState('');
  const [searchState, setSearchState] = useState(false);
  const [projectList, setProjectList] = useState(listOfProj);

  return (
    <View style={styles.WrapperView}>
      <HeaderWithThreeBtn
        searchValue={searchState}
        rightMenuPress={() => navigation.openDrawer()}
        backPress={() => navigation.pop()}
        searchPress={() => setSearchState(!searchState)} />
      <SafeAreaView style={styles.safeView}>
        <TouchableOpacity style={styles.AddProjectBtn}>
          <Text style={styles.BtnText}>NEW PROJECT</Text>
        </TouchableOpacity>
        <FlatList
          data={projectList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item, index) => <TouchableOpacity style={styles.ItemWrapper}>
            <TextInput style={styles.textInputWrapper} value={item.item.listing.title} editable={false} />
            <TouchableOpacity style={styles.viewBtn}
              onPress={() => {
                navigation.navigate('ToolsMaterial', { type: item.item.type, materialsList: item.item.materialsList, toolsList: item.item.toolsList, listing: item.item.listing })
              }} >
              <Text style={styles.BtnText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.absoluteTopBtn}>
              <MaterialIcons name="delete" size={20} color={colors.grey} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.absoluteTopBtn, { right: 50 }]} onPress={() => {
              navigation.navigate('ToolsMaterial', { type: item.item.type, materialsList: item.item.materialsList, toolsList: item.item.toolsList, listing: item.item.listing })
            }}>
              <MaterialIcons name="edit" size={20} color={colors.grey} />
            </TouchableOpacity>
          </TouchableOpacity>} />
      </SafeAreaView>
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
  safeView: {
    flex: 1,
    backgroundColor: colors.light,
  },
  AddProjectBtn: {
    height: 40,
    paddingHorizontal: 10,
    marginTop: 10,
    backgroundColor: colors.orange,
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN.width / 2,
    marginLeft: 10,
  },
  ItemWrapper: {
    paddingVertical: 25,
    width: SCREEN.width - 40,
    alignSelf: 'center',
    marginTop: 15,
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: colors.grey,
  },
  BtnText: {
    fontSize: 15,
    color: colors.white,
    fontWeight: 'bold',
  },
  rowView: {
    height: 80,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  textInputWrapper: {
    height: 40,
    width: SCREEN.width - 80,
    alignSelf: 'center',
    borderBottomWidth: 0.4,
    borderColor: colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  viewBtn: {
    height: 40,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.orange,
    marginTop: 30,
    marginLeft: 20,
  },
  doneText: {
    fontSize: 15,
    color: colors.secondary,
    marginLeft: 15,
  },
  absoluteTopBtn: {
    position: 'absolute',
    top: 5,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 20,
    width: 20,
  },

});

export default AddProjectScreen;

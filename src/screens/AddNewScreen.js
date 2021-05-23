import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  SectionList,
  Image,
  Text
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import { FlatList, TextInput } from "react-native-gesture-handler";

function AddProjectScreen({ route, navigation }) {
  const [searchValue, setSearchValue] = useState('');
  return (

    <View style={styles.WrapperView}>
      <SafeAreaView style={styles.WrapperView}>
        <View style={styles.rowView}>
          <View style={styles.textInputWrapper}>
            <MaterialIcons name="add" color={colors.secondary} size={30} />
            <TextInput style={{ height: 40, width: '80%' }} onChangeText={(value) => setSearchValue(value)} value={searchValue} />
            {searchValue !== '' &&
              <TouchableOpacity
                onPress={() => setSearchValue('')}
                style={{ position: 'absolute', right: 5, height: 40, width: 30, justifyContent: 'center', alignItems: 'center' }}>
                <Entypo name='circle-with-cross' size={20} color={colors.black} />
              </TouchableOpacity>}
          </View>
          <Text onPress={() => navigation.pop()} style={styles.doneText}>Done</Text>
        </View>
        <View style={{ flex: 1, backgroundColor: colors.light }}>
          <FlatList
            data={[
              {
                id: 21,
                homedepotId: "D21",
                name: "Lumber",
              },
              {
                id: 22,
                homedepotId: "D22",
                name: "Building Materials",
              },
              {
                id: 23,
                homedepotId: "D23",
                name: "Flooring",
              },
               {
                id: 24,
                homedepotId: "D24",
                name: "Paint",
              },
               {
                id: 25,
                homedepotId: "D25",
                name: "Tools & Hardware",
              },
               {
                id: 26,
                homedepotId: "D26",
                name: "Plumbing",
              },
               {
                id: 27,
                homedepotId: "D27",
                name: "Electrical",
              },
               {
                id: 28,
                homedepotId: "D28",
                name: "Lawn & Garden",
              },
               {
                id: 29,
                homedepotId: "D29",
                name: "Kitchen & Bath",
              },
               {
                id: 30,
                homedepotId: "D30",
                name: "Millwork",
              },
             {
                id: 42,
                homedepotId: "D42",
                name: "Pro Desk",
              },
               {
                id: 59,
                homedepotId: "D59",
                name: "Decor/Storage/Blinds",
              },
               {
                id: 70,
                homedepotId: "D70",
                name: "Appliances",
              },
               {
                id: 78,
                homedepotId: "D78",
                name: "Tool Rental",
              },
                 {
                id: 85,
                homedepotId: "D85",
                name: "Kitchen & Bath",
              },
                  {
                id: 90,
                homedepotId: "D90",
                name: "Cashier",
              },
                 {
                id: 96,
                homedepotId: "D96",
                name: "Lot",
              },
                
            ]}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item, index) => <TouchableOpacity
            onPress={() => navigation.pop()}
              style={{
                height: 40,
                minWidth: 200,
                maxWidth: 250,
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
                <View style={{
                minWidth: 100,
                maxWidth: 250,
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 10,
                backgroundColor: colors.white,
                borderRadius: 20,
              }}>
              <MaterialIcons name="add" color={colors.grey} size={30} />
              <Text style={{ fontSize: 15, marginLeft: 14 }}>
                {item.item.name + '     ' + '🍔'}
              </Text>
              </View>
            </TouchableOpacity>} />
        </View>
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
  rowView: {
    height: 80,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  textInputWrapper: {
    height: 40,
    width: '85%',
    borderRadius: 20,
    borderWidth: 0.4,
    borderColor: colors.grey,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  doneText: {
    fontSize: 15,
    color: colors.secondary,
    marginLeft: 15,
  },

});

export default AddProjectScreen;

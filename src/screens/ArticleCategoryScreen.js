import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, SectionList, View, Text, TouchableOpacity } from "react-native";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import CategoryCard from "../components/CategoryCard";
import colors from "../config/colors";
import articlesApi from "../api/articles";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import useApi from "../hooks/useApi";
import HeaderWithLeftLogo from "../components/HeaderWithLeftLogo";
import { SCREEN } from "../config/Constant";

var indoorCategories = [];
var outdoorCategories = [];

class ArticleCategoryScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchState: false,
      indoorList: [],
      outDoorList: [],
      loading: false,
      selectedIndex: 0,
      categoriesData: [],
      articleData: [],
    }
  }

  async sortData() {
    const getArticlesCategoriesApi = await articlesApi.getCategories();
    const articleData = await articlesApi.getArticles();
    const dataRecieved = getArticlesCategoriesApi.data;
    this.setState({articleData : articleData.data})
    this.setState({categoriesData : dataRecieved})
    indoorCategories = []
    outdoorCategories = []
    dataRecieved.forEach(element => {
      if (element.superCategory === 'outdoor') {
        outdoorCategories.push(element)
      } else {
        indoorCategories.push(element)
      }
    });
    this.setState({ indoorList: indoorCategories });
    this.setState({ outDoorList: outdoorCategories });
    this.setState({ loading: !this.state.loading });
  }

  getCount = (id) => {
    let count = 0;
    this.state.articleData && this.state.articleData.forEach(element => {
      if (element.categoryId === id) { count++ }
    });
    return count;
  }

  async componentDidMount() {
    this.sortData();
  }

  render() {
    return (
      <View style={styles.mainScreen}>
        <HeaderWithLeftLogo headerText={'Home'}
          searchValue={this.state.searchState}
          rightMenuPress={() => this.props.navigation.openDrawer()}
          searchPress={() => this.setState({ searchState: !this.state.searchState })} />
        <ActivityIndicator visible={!this.state.loading} />

        <View style={styles.SwtchWrapper}>
          <TouchableOpacity onPress={() => this.setState({selectedIndex: 0})} activeOpacity={0.8} style={[styles.Flex1, { backgroundColor: this.state.selectedIndex ===  0 ? colors.orange : 'rgba(226, 226, 226, 1)' }]}>
            <Text style={styles.CategoryText}>Indoor</Text>
            <View style={styles.rightAbsoluteView}>
              <Text style={styles.countText}>{'6'}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.setState({selectedIndex: 1})} activeOpacity={0.8} style={[styles.Flex1, { backgroundColor: this.state.selectedIndex === 1 ? colors.orange : 'rgba(226, 226, 226, 1)' }]}>
            <Text style={styles.CategoryText}>Outdoor</Text>
            <View style={styles.rightAbsoluteView}>
              <Text style={styles.countText}>{'4'}</Text>
            </View>
          </TouchableOpacity>
          </View>
          <Screen style={styles.screen}>
        {this.state.error && (
          <>
            <AppText>Couldn't retrieve the Menu.</AppText>
            <Button title="Retry" onPress={getArticlesCategoriesApi.request} />
          </>
        )}
        {this.state.selectedIndex == 0 ? <FlatList
          data={this.state.indoorList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <CategoryCard
              countValue={this.getCount(item.id)}
              title={item.name}
              onPress={() => this.props.navigation.navigate(routes.ARTICLE_SUB_CATEGORY, item)}
            />
          )}
        /> :
          <FlatList
            data={this.state.outDoorList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <CategoryCard
                countValue={this.getCount(item.id)}
                title={item.name}
                onPress={() => this.props.navigation.navigate(routes.ARTICLE_SUB_CATEGORY, item)}
              />
            )}
          />}
      </Screen>

        </View>
    );
  }
}


const styles = StyleSheet.create({
  screen: {
    paddingTop: 10,
    backgroundColor: colors.light,
  },
  SwtchWrapper: {
    height: 40,
    width: SCREEN.width,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  Flex1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  CategoryText: {
    fontSize: 15,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  mainScreen: {
    flex: 1,
  },
  rightAbsoluteView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    height: 30,
    width: 30,
    borderRadius: 15,
    paddingVertical: 7,
    backgroundColor: 'rgba(246, 246, 246, 1)',
  },
  countText: {
    color: colors.medium,
    fontSize: 13,
  },
});

export default ArticleCategoryScreen;

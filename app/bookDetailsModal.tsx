import React from "react";
import {ScrollView, View, Text} from "react-native";
import {useRoute} from "@react-navigation/native";

export default function BookDetailsModal() {
    const route = useRoute();
    const data: any = route.params;

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ScrollView style={{ flex: 1 }}>
                <Text style={{ fontSize: 20, textAlign: 'center', padding: 10}}>{data.data.publisher}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                    {data.data.categories.map((category: string, index: number) => (
                        <View key={index} style={{ padding: 15, backgroundColor: "grey", borderRadius: 10}}>
                            <Text style={{ fontSize: 20, textAlign: 'center', color:"white", fontWeight: "bold"}} >{category}</Text>
                        </View>
                    ))}
                </View>
                <Text style={{ fontSize: 20, textAlign: 'justify', padding: 10}}>{data.data.description}</Text>
                <Text style={{ fontSize: 20, textAlign: 'center', padding: 10}}>Nombre de pages : {data.data.pageCount}</Text>
            </ScrollView>
        </View>
    );
};
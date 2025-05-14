import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Button,
  Text,
  Alert,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { fetchExpenses, deleteExpense } from "../services/api";
import { addToDeleteQueue, loadExpenses, saveExpenses } from "../storage/localDB";
import ExpenseItem from "../component/ExpenseItem";
import { isOnline } from "../services/network";
import { syncExpenses } from "../services/sync";

export default function TabTwoScreen() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  // useEffect(() => {
  //   const init = async () => {
  //     setLoading(true);
      
  //     try {
  //       // First try to load local data
  //       const local = await loadExpenses();
  //       if (local && local.length > 0) {
  //         console.log("Loaded local expenses:", local);
  //         setExpenses(local);
  //       }

  //       // Then try to fetch remote data
  //       try {
  //         console.log("Fetching remote expenses...");
  //         const remote = await fetchExpenses();
  //         console.log("Fetched remote expenses:", remote);
          
  //         if (remote && remote.length > 0) {
  //           // Merge local and remote data, removing duplicates
  //           const merged = [...(local || []), ...(remote || [])];
  //           const unique:any = Array.from(
  //             new Map(merged.map((e) => [e._id, e])).values()
  //           );
  //           console.log("Merged expenses:", unique);
            
  //           setExpenses(unique);
  //           saveExpenses(unique);
  //         }
  //       } catch (err) {
  //         console.error("API error:", err);
  //         // We already loaded local data if available, so just show a message
  //         setError("Couldn't connect to server. Showing locally saved expenses.");
  //       }
  //     } catch (err) {
  //       console.error("Error in initialization:", err);
  //       setError("Failed to load expenses");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   init();
  // }, []);

  // const handleDelete = async (rowKey:any) => {
  //   const updated = expenses.filter((e:any) => e._id !== rowKey);
  //   setExpenses(updated);
  //   saveExpenses(updated);

  //   try {
  //     await deleteExpense(rowKey);
  //     Alert.alert("Sync Notice", "IsDeleted become true. Will sync when connection is restored.");
  //   } catch (err) {
  //     console.error("Delete error:", err);
  //     Alert.alert("Sync Notice", "Deleted locally. Will sync when connection is restored.");
  //   }
  // };

  useEffect(() => {
  const init = async () => {
    setLoading(true);
    try {
      const local = await loadExpenses();
      if (local.length > 0) setExpenses(local);

      try {
        const remote = await fetchExpenses();
        const merged = [...(local || []), ...(remote || [])];
        const unique:any = Array.from(new Map(merged.map(e => [e._id, e])).values());
        setExpenses(unique);
        saveExpenses(unique);
      } catch (err) {
        console.error("API error:", err);
        setError("Couldn't connect to server. Showing locally saved expenses.");
      }

      // Trigger sync attempt
      await syncExpenses();
    } catch (err) {
      setError("Failed to load expenses");
    } finally {
      setLoading(false);
    }
  };

  init();
}, []);

  const handleDelete = async (rowKey: any) => {
  const updated = expenses.filter((e: any) => e._id !== rowKey);
  setExpenses(updated);
  await saveExpenses(updated);

  const online = await isOnline();

  if (online) {
    try {
      await deleteExpense(rowKey);
      await syncExpenses(); // just in case queue existed
      Alert.alert("Deleted", "Expense deleted successfully.");
    } catch (err) {
      console.error("Delete error:", err);
      await addToDeleteQueue(rowKey);
      Alert.alert("Offline", "Deleted locally. Will sync when online.");
    }
  } else {
    await addToDeleteQueue(rowKey);
    Alert.alert("Offline", "Deleted locally. Will sync when online.");
  }
};

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.headerCell, styles.header]}>Category</Text>
      <Text style={[styles.headerCell, styles.header]}>Amount</Text>
      <Text style={[styles.headerCell, styles.header]}>Description</Text>
      <Text style={[styles.headerCell, styles.header]}>Date</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
            color: "#ffffff",
          }}
        >
          Expenses
        </Text>
        
        {/* Header Row */}
        {renderHeader()}

        {/* List of Expenses */}
        <SwipeListView
          data={expenses}
          keyExtractor={(item: any) => item._id || item.date}
          renderItem={({ item }) => <ExpenseItem item={item} />}
          renderHiddenItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#ffffff",
                justifyContent: "center",
                alignItems: "flex-end",
                height: "100%",
              }}
            >
              <Button
                title="Delete"
                onPress={() => handleDelete(item._id)}
                color="blue"
              />
            </View>
          )}
          rightOpenValue={-75}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    padding: 20,
    backgroundColor: '#121212', // Black background
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 100 : 20,
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerRow: {
    flexDirection: 'row',
    marginBottom: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 10,
    // marginBottom: 16,
  },
  headerCell: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  },
});


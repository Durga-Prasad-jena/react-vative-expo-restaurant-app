import { Text, TouchableOpacity, View } from "react-native";

const GuestPickerUserComponent = ({ selectedNumber, setSelectedNumber }) => {
     const handleIncrement = () =>{
          if(selectedNumber>1){
               setSelectedNumber(selectedNumber-1)
          }
     }

     const handleDecrement = () =>{
          if(selectedNumber < 12){
              setSelectedNumber(selectedNumber + 1)
          }
     }
  return (
    <View className="flex-1 flex-row gap-1  items-center ">
      <TouchableOpacity onPress={handleIncrement}>
        <Text className="text-white text-lg border border-[#f49b33] rounded-l-lg px-4">-</Text>
      </TouchableOpacity>
      <Text className='text-white text-lg'>{selectedNumber}</Text>
      <TouchableOpacity onPress={handleDecrement} >
        <Text className="text-white text-lg border border-[#f49b33] rounded-r-lg px-4">+</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GuestPickerUserComponent;

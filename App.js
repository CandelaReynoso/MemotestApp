import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import Card from './Card';


const cards = [
"🍕", 
"🍔", 
"🍟", 
"🍦", 
"🍩", 
"🍓", 
];

export default function App() {
  const [board, setBoard ]= React.useState(() => shuffle([...cards,...cards]))
  const [selectedCards, setSelectedCards] = React.useState([]);
  const [matchedCards, setMatchedCards] = React.useState([]);
  const [score, setScore] = React.useState(0);

  React.useEffect(() => {
    if (selectedCards.length > 2) return;
    if (selectedCards.length === 2) {
      if (board[selectedCards[0]] === board[selectedCards[1]]) {
        setMatchedCards((prevMatchedCards) => [...prevMatchedCards, ...selectedCards]);
        setSelectedCards([]);
      } else {
        const timeoutId = setTimeout(() => setSelectedCards([]), 1000);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [selectedCards, board]);
  
  
  
  

  const handleTapCard = (index) => {
    if(selectedCards.length >= 2 || selectedCards.includes (index)) return;
    setSelectedCards([...selectedCards, index]);
    setScore(score + 1);
  }
 
  const didPlayerWin = () => matchedCards.length === board.length;

  const resetGame = () => {
    setMatchedCards([]);
    setScore(0);
    setSelectedCards([]); 
  }
  return (
    <View style={styles.container}>
      <Text style= {styles.title}> 
      {didPlayerWin() ? "Congrats! 🎉🎉🎉" : "MEMORY"}
      </Text>
      <Text style= {styles.title}>Score:{score}</Text>
      <View style={styles.board}> 
            {board.map((card,index) => {
              const isTurnedOver = selectedCards.includes(index) ||  matchedCards.includes(index);
          return (
            <Card 
            key={index}
            isTurnedOver={isTurnedOver}
            onPress={() => handleTapCard(index)} 
            >{card} </Card>
          )
        })}
      </View>   
      {didPlayerWin() && <Button onPress= {resetGame}  title = "RESET"/> }
      <StatusBar style="light"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    fontSize: 32,
    fontWeight: "900",
    color: "white",
  },
  board: {
    flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
  }
});

//se utiliza para desordenar los elementos del array de card (Emojis)
function shuffle(array) {
  for(let i= array.length -1; i> 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}
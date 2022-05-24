import React, { useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import Text from "./components/Text";
import Confetti from "react-confetti";

function App() {
	const [dieState, setDieState] = useState(allNewDice);
	const [tenzies, setTensies] = useState(false);

	useEffect(() => {
		const allHeld = dieState.every((die) => die.isHeld);
		const allMatch = dieState.every((die) => dieState[0].value === die.value);

		if (allHeld && allMatch) {
			setTensies(true);
		}
	}, [dieState]);

	function allNewDice() {
		const diceArray = [];
		for (let i = 0; i < 10; i++) {
			const rand = Math.floor(Math.random() * 7);
			diceArray.push({ key: i, value: rand, isHeld: false });
		}

		return diceArray;
	}

	function holdDice(key) {
		setDieState((prevObject) => {
			const newArray = [];

			for (let i = 0; i < 10; i++) {
				if (prevObject[i].key === key) {
					newArray.push({ ...prevObject[i], isHeld: !prevObject[i].isHeld });
				} else {
					newArray.push(prevObject[i]);
				}
			}
			return newArray;
		});
		console.log("Dice Held", key);
	}

	function rollDice() {
		setDieState((prevObject) => {
			const newArray = [];
			for (let i = 0; i < 10; i++) {
				if (prevObject[i].isHeld === true) {
					newArray.push(prevObject[i]);
				} else {
					const rand = Math.floor(Math.random() * 7);
					newArray.push({ key: i, value: rand, isHeld: false });
				}
			}

			return newArray;
		});
	}

	const diceArray = dieState.map((dice) => (
		<Die
			key={dice.key}
			value={dice.value}
			style={dice.isHeld ? "die--held" : "die"}
			isheld={dice.isHeld}
			handleClick={() => holdDice(dice.key)}
		/>
	));

	function youWon() {
		setDieState(allNewDice);
		setTensies(false);
	}

	return (
		<div className="App">
			<div className="main">
				<div className="background-white">
					<div className="playArea">
						{tenzies && <Confetti />}
						<Text />
						<div className="dice">{diceArray}</div>
						{tenzies ? (
							<button className="button" onClick={youWon}>
								Reset Game
							</button>
						) : (
							<button className="button" onClick={rollDice}>
								Roll
							</button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;

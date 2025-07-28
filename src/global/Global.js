import './Global.css';
import cards from './cards';
import TierList from './components/TierList';
import Weights from './components/Weights';
import SelectedCards from './components/SelectedCards';
import Filters from './components/Filters';
import React from 'react';
import { Link } from 'react-router-dom';

class Global extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weights: {
                type: 0,
                bondPerDay: 3.5,
                trainingDays: 50,
                races: [10,10,5,3],
                unbondedTrainingGain: [
                    [8,0,4,0,0,2,19],
                    [0,7,0,3,0,2,17],
                    [0,4,6,0,0,2,18],
                    [3,0,3,6,0,2,20],
                    [2,0,0,0,6,3,0]
                ],
                bondedTrainingGain: [
                    [10,0,4,0,0,2,21],
                    [0,8,0,3,0,2,18],
                    [0,4,7,0,0,2,19],
                    [4,0,3,9,0,2,24],
                    [3,0,0,0,9,3,0]
                ],
                summerTrainingGain: [
                    [11,0,5,0,0,2,22],
                    [0,9,0,6,0,2,21],
                    [0,4,10,0,0,2,21],
                    [3,0,2,10,0,2,24],
                    [3,0,0,0,9,3,0]
                ],
                umaBonus: [1,1,1,1,1,1],
                stats: [1,1,1.1,1,1,0.5,1.5],
                multi: 1,
                bonusFS: 0,
                bonusSpec: 0,
                motivation: 0.2,
                scenarioLink: [],
                scenarioBonus: 0,
                fanBonus: 0.05,
                prioritize: true,
                onlySummer: false,
            },
            selectedCards: [
                cards.find((c) => c.id === 30028 && c.limit_break === 4),
                cards.find((c) => c.id === 20023 && c.limit_break === 4),
                cards.find((c) => c.id === 20020 && c.limit_break === 4),
                cards.find((c) => c.id === 20009 && c.limit_break === 4),
                cards.find((c) => c.id === 20003 && c.limit_break === 4),
            ],
            availableCards: cards,
            label: "Ranking for the 4th Speed card in this deck:"
        }

        this.onWeightsChanged = this.onWeightsChanged.bind(this);
        this.onCardSelected = this.onCardSelected.bind(this);
        this.onCardRemoved = this.onCardRemoved.bind(this);
        this.onCardsChanged = this.onCardsChanged.bind(this);
        this.onLoadPreset = this.onLoadPreset.bind(this);
    }

    onWeightsChanged(statWeights, generalWeights) {
        let combinedWeights = {...statWeights, ...generalWeights};
        this.setState({weights: combinedWeights});
    }

    onCardSelected(card) {
        if (this.state.selectedCards.length > 5) return;
        let cards = this.state.selectedCards.slice();
        let index = this.state.selectedCards.findIndex((c) => c.id === card.id);

        if (index > -1) {
            cards[index] = card;
        } else {
            cards.push(card);
        }

        this.setState({selectedCards:cards});
    }

    onCardRemoved(card) {
        if (this.state.selectedCards.length === 1) return;
        let cards = this.state.selectedCards.slice();
        let cardIndex = cards.findIndex((c) => c.id === card.id);
        cards.splice(cardIndex, 1);
        this.setState({selectedCards:cards});
    }

    onCardsChanged(cards) {
        this.setState({availableCards: cards});
    }

    onLoadPreset(presetCards) {
        let selectedCards = [];
        for(let i = 0; i < presetCards.length; i++) {
            selectedCards.push(cards.find((c) => c.id === presetCards[i] && c.limit_break === 4));
        }
        this.setState({selectedCards:selectedCards});
    }

    render() {
        return (
            <div className="App">
                <h1>Uma Musume Support Card Tier List</h1>
                <span className="section-explanation">
                    For more game information, check the <a href="https://docs.google.com/document/d/11X2P7pLuh-k9E7PhRiD20nDX22rNWtCpC1S4IMx_8pQ/edit?usp=sharing">Uma Musume Reference</a><br/>
                    If you play on JP, use the <Link to="/uma-tiers">JP Tier List</Link><br/>
                    This tier list defaults to the URA Scenario and doesn't consider skills, only stats.<br/>
                </span>
                <Weights
                    onChange={this.onWeightsChanged}
                    />
                <SelectedCards
                    selectedCards={this.state.selectedCards}
                    onClick={this.onCardRemoved}
                    onLoadPreset={this.onLoadPreset}
                    weights={this.state.weights}
                    />
                <Filters
                    onCardsChanged={this.onCardsChanged}
                    />
                <TierList 
                    cards={this.state.availableCards}
                    weights={this.state.weights}
                    selectedCards={this.state.selectedCards}
                    cardSelected={this.onCardSelected}
                />
            </div>
        );
    }
}

export default Global;

import React, { useState, useMemo } from 'react';
import PlayerList from './components/PlayerList';
import PlayerModal from './components/PlayerModal';
import FilterControls from './components/FilterControls';
import SpreadsheetView from './components/SpreadsheetView';
import TeamCompList from './components/TeamCompList';
import TeamCompModal from './components/TeamCompModal';
import CharacterModal from './components/CharacterModal';
import { Player, TeamComposition, Character } from './types';
import { INITIAL_PLAYERS, INITIAL_CHARACTERS } from './constants';

const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
  </svg>
);

type Tab = 'roster' | 'spreadsheet' | 'teams';

const App: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>(INITIAL_PLAYERS);
  const [characters, setCharacters] = useState<Character[]>(INITIAL_CHARACTERS);
  const [teamComps, setTeamComps] = useState<TeamComposition[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('roster');

  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  
  const [isTeamCompModalOpen, setIsTeamCompModalOpen] = useState(false);
  const [editingTeamComp, setEditingTeamComp] = useState<TeamComposition | null>(null);

  const [isCharacterModalOpen, setIsCharacterModalOpen] = useState(false);
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

  const [filters, setFilters] = useState({ name: '', status: '', character: '', mainRole: '' });

  // Player Handlers
  const handleOpenPlayerModal = (player: Player | null) => {
    setEditingPlayer(player);
    setIsPlayerModalOpen(true);
  };
  const handleClosePlayerModal = () => {
    setEditingPlayer(null);
    setIsPlayerModalOpen(false);
  };
  const handleSavePlayer = (player: Player) => {
    setPlayers(prev => {
      const exists = prev.some(p => p.id === player.id);
      if (exists) {
        return prev.map(p => (p.id === player.id ? player : p));
      }
      return [...prev, player];
    });
    handleClosePlayerModal();
  };
  const handleDeletePlayer = (playerId: string) => {
    if (window.confirm('Are you sure you want to delete this player? This will also remove them from any team compositions.')) {
      setPlayers(players.filter(p => p.id !== playerId));
      setTeamComps(prevComps => prevComps.map(comp => ({
        ...comp,
        players: comp.players.filter(p => p.playerId !== playerId)
      })));
    }
  };

  // Character Handlers
  const handleOpenCharacterModal = (character: Character | null) => {
    setEditingCharacter(character);
    setIsCharacterModalOpen(true);
  };
  const handleCloseCharacterModal = () => {
    setEditingCharacter(null);
    setIsCharacterModalOpen(false);
  };
  const handleSaveCharacter = (character: Character) => {
    setCharacters(prev => {
      const exists = prev.some(c => c.id === character.id);
      if (exists) {
        return prev.map(c => (c.id === character.id ? character : c));
      }
      return [...prev, character];
    });
    handleCloseCharacterModal();
  };
  const handleDeleteCharacter = (characterId: string) => {
    if (window.confirm('Are you sure you want to delete this character? This will remove it from all players and team compositions.')) {
      // 1. Remove character from main list
      setCharacters(prev => prev.filter(c => c.id !== characterId));
      // 2. Remove character from all players' character lists
      setPlayers(prev => prev.map(p => ({
        ...p,
        characters: p.characters.filter(c => c.characterId !== characterId)
      })));
      // 3. Remove character from all team comps
      setTeamComps(prev => prev.map(tc => ({
        ...tc,
        players: tc.players.filter(p => p.characterId !== characterId)
      })));
    }
  };


  // Team Comp Handlers
  const handleOpenTeamCompModal = (teamComp: TeamComposition | null) => {
    setEditingTeamComp(teamComp);
    setIsTeamCompModalOpen(true);
  };
  const handleCloseTeamCompModal = () => {
    setEditingTeamComp(null);
    setIsTeamCompModalOpen(false);
  };
  const handleSaveTeamComp = (teamComp: TeamComposition) => {
    setTeamComps(prev => {
        const exists = prev.some(tc => tc.id === teamComp.id);
        if (exists) {
            return prev.map(tc => (tc.id === teamComp.id ? teamComp : tc));
        }
        return [...prev, teamComp];
    });
    handleCloseTeamCompModal();
  };
  const handleDeleteTeamComp = (teamCompId: string) => {
     if (window.confirm('Are you sure you want to delete this team composition?')) {
        setTeamComps(teamComps.filter(tc => tc.id !== teamCompId));
    }
  };
  
  const filteredPlayers = useMemo(() => {
    return players.filter(player => {
        const nameMatch = player.name.toLowerCase().includes(filters.name.toLowerCase());
        const statusMatch = !filters.status || player.status === filters.status;
        const characterMatch = !filters.character || player.characters.some(c => c.characterId === filters.character);
        const roleMatch = !filters.mainRole || player.mainRole === filters.mainRole;
        return nameMatch && statusMatch && characterMatch && roleMatch;
    });
  }, [players, filters]);

  const renderContent = () => {
    switch(activeTab) {
      case 'roster':
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-text-light">Player Roster</h2>
              <button onClick={() => handleOpenPlayerModal(null)} className="flex items-center justify-center bg-accent text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-accent-hover transition-colors duration-300">
                <PlusIcon /> Add Player
              </button>
            </div>
            <FilterControls onFilterChange={setFilters} characters={characters} />
            <PlayerList players={filteredPlayers} characters={characters} onEdit={handleOpenPlayerModal} onDelete={handleDeletePlayer} />
          </>
        );
      case 'spreadsheet':
        return (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-text-light">Character Database</h2>
               <button onClick={() => handleOpenCharacterModal(null)} className="flex items-center justify-center bg-accent text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-accent-hover transition-colors duration-300">
                <PlusIcon /> Add Character
              </button>
            </div>
            <SpreadsheetView 
              characters={characters} 
              players={players} 
              onEditCharacter={handleOpenCharacterModal} 
              onDeleteCharacter={handleDeleteCharacter} 
            />
          </>
        );
      case 'teams':
        return (
           <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-text-light">Team Compositions</h2>
              <button onClick={() => handleOpenTeamCompModal(null)} className="flex items-center justify-center bg-accent text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-accent-hover transition-colors duration-300">
                <PlusIcon /> Create Comp
              </button>
            </div>
            <TeamCompList teamComps={teamComps} players={players} characters={characters} onEdit={handleOpenTeamCompModal} onDelete={handleDeleteTeamComp} />
          </>
        );
      default:
        return null;
    }
  }

  const TabButton: React.FC<{tabId: Tab, children: React.ReactNode}> = ({tabId, children}) => (
     <button
        onClick={() => setActiveTab(tabId)}
        className={`px-4 py-2 text-sm font-semibold rounded-t-lg transition-colors ${activeTab === tabId ? 'bg-secondary text-white' : 'text-text-dark hover:bg-primary hover:text-text-light'}`}
      >
        {children}
      </button>
  );

  return (
    <div className="min-h-screen bg-primary font-sans">
      <header className="bg-secondary shadow-md py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center text-white tracking-wider">
            Marvel Rivals Team Manager
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="border-b border-border-color mb-6">
            <nav className="flex space-x-2">
                <TabButton tabId="roster">Player Roster</TabButton>
                <TabButton tabId="spreadsheet">Character Database</TabButton>
                <TabButton tabId="teams">Team Comps</TabButton>
            </nav>
        </div>

        {renderContent()}
      </main>

      <PlayerModal isOpen={isPlayerModalOpen} player={editingPlayer} onClose={handleClosePlayerModal} onSave={handleSavePlayer} characters={characters} />
      <TeamCompModal isOpen={isTeamCompModalOpen} teamComp={editingTeamComp} players={players} characters={characters} onClose={handleCloseTeamCompModal} onSave={handleSaveTeamComp} />
      <CharacterModal isOpen={isCharacterModalOpen} character={editingCharacter} onClose={handleCloseCharacterModal} onSave={handleSaveCharacter} />
    </div>
  );
};

export default App;

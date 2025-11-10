
import React, { useState, useEffect } from 'react';
import { SendOutlined, SmileOutlined } from '@ant-design/icons';
import MessageArea from './components/MessageArea';
import UserListPanel from './components/UserListPanel';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  // 禁用全局右键菜单
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  // 聊天室数据
  const [chatRooms, setChatRooms] = useState([
    { id: 1, name: '主页', icon: 'fas fa-home', unread: 0, roomId: '123456789' },
    { id: 2, name: '综合文字', icon: 'fas fa-comments', unread: 12, roomId: '987654321' },
  ]);
  
  // 用户列表
  const [users, setUsers] = useState([
    { id: 1, name: '张伟', status: 'online', avatar: 'https://ai-public.mastergo.com/ai/img_res/3b71fa6479b687f7aac043084415c2d8.jpg' },
    { id: 2, name: '李娜', status: 'online', avatar: 'https://ai-public.mastergo.com/ai/img_res/945a373ac8cba538922e3056a3952a11.jpg' },
    { id: 3, name: '王强', status: 'away', avatar: 'https://ai-public.mastergo.com/ai/img_res/7adaab35c68fc4617a58a8f92fab236e.jpg' },
    { id: 4, name: '陈丽', status: 'offline', avatar: 'https://ai-public.mastergo.com/ai/img_res/5859f4b402a6ff0d8bea996cd06fdc92.jpg' },
    { id: 5, name: '刘洋', status: 'online', avatar: 'https://ai-public.mastergo.com/ai/img_res/5c984aeccb5ac5c312115f2fd5156392.jpg' },
    { id: 6, name: '赵敏', status: 'online', avatar: 'https://ai-public.mastergo.com/ai/img_res/7a980361c3d1da375258bf634ee252e2.jpg' },
    { id: 7, name: '孙浩', status: 'offline', avatar: 'https://ai-public.mastergo.com/ai/img_res/32fc8c243d88ae9356b7c163b7a074fb.jpg' },
    { id: 8, name: '周婷', status: 'online', avatar: 'https://ai-public.mastergo.com/ai/img_res/a6c192a6ab8c78559ecbcfa7450ea237.jpg' },
  ]);
  
  // 消息记录
  const [messages, setMessages] = useState([
    { id: 1, userId: 2, userName: '李娜', text: '大家好，欢迎来到综合文字聊天室！', time: '14:30', isOwn: false },
    { id: 2, userId: 1, userName: '张伟', text: '你好李娜，很高兴加入这个聊天室', time: '14:32', isOwn: true },
    { id: 3, userId: 3, userName: '王强', text: '今天天气不错，适合聊天', time: '14:35', isOwn: false },
    { id: 4, userId: 4, userName: '陈丽', text: '确实，阳光明媚的好心情', time: '14:36', isOwn: false },
    { id: 5, userId: 1, userName: '张伟', text: '有什么好的话题推荐吗？', time: '14:40', isOwn: true },
    { id: 6, userId: 5, userName: '刘洋', text: '最近有什么好看的电影吗？', time: '14:42', isOwn: false },
    { id: 7, userId: 6, userName: '赵敏', text: '我推荐《星际穿越》，科幻迷必看', time: '14:45', isOwn: false },
    { id: 8, userId: 1, userName: '张伟', text: '谢谢推荐，周末去看看', time: '14:47', isOwn: true },
  ]);
  
  // 当前选中的聊天室
  const [activeChatRoom, setActiveChatRoom] = useState(2);
  
  // 输入框内容
  const [inputValue, setInputValue] = useState('');
  
  // 表情面板显示状态
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  
  // 发送消息
  const handleSend = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        userId: 1,
        userName: '张伟',
        text: inputValue,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      setShowEmojiPanel(false);
    }
  };
  
  // 添加表情到输入框
  const addEmoji = (emoji: string) => {
    setInputValue(prev => prev + emoji);
  };
  
  // 复制聊天室ID
  const copyRoomId = (roomId: string) => {
    navigator.clipboard.writeText(roomId).then(() => {
      // 可以添加提示信息
      console.log('已复制聊天室ID:', roomId);
    }).catch(err => {
      console.error('复制失败:', err);
    });
  };
  
  // 添加聊天室处理函数
  const handleAddChatRoom = () => {
    // TODO: 实现添加聊天室的逻辑
    console.log('添加聊天室');
  };

  // 表情数据
  const emojis = [
    '😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙃', '😉', '😊',
    '😇', '🥰', '🤩', '😘', '😗', '😚', '😙', '😋', '😛', '😜', '🤪',
    '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏',
    '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '🤒', '🤕',
    '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓',
    '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧',
    '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫',
    '🥱', '😤', '😡', '😠', '🤬', '👍', '👏', '🙌', '👐', '🤲', '🤝',
    '🙏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝️', '👋',
    '🤚', '🖐', '✋', '🖖', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃',
    '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕',
    '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉', '☸️',
    '✨', '⭐', '🌟', '⚡', '💥', '💦', '💨', '🌈', '☀️', '⛅',
    '🎉', '🎊', '🎈', '🎁', '🏆', '🥇', '🥈', '🥉', '🏀', '🏈',
    '💯', '💢', '💬', '💭', '🗯', '💤', '💮', '♨️', '💈', '🛑', '⚠️', '🚸'
  ];
  
  return (
    <div className="flex h-screen w-screen bg-black text-white">
      {/* 左侧边栏 */}
      <Sidebar
        chatRooms={chatRooms}
        activeChatRoom={activeChatRoom}
        users={users}
        onChatRoomChange={setActiveChatRoom}
        onAddChatRoom={handleAddChatRoom}
      />

      {/* 右侧主体区域 */}
      <div className="flex flex-1 h-screen">
        {/* 中间内容区域 */}
        <div className="flex-1 flex flex-col">
          {/* 顶部信息栏 */}
          <div className="flex items-center justify-between px-6 py-3 bg-gray-900 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="text-xl font-semibold">
                <i className={`${chatRooms.find(room => room.id === activeChatRoom)?.icon} mr-3 text-lg`}></i>
                {chatRooms.find(room => room.id === activeChatRoom)?.name}聊天室
              </div>
              <div className="flex items-center pt-3 space-x-2 text-sm text-gray-500">
                <span>ID: {chatRooms.find(room => room.id === activeChatRoom)?.roomId}</span>
                <button
                  className="p-1 hover:bg-gray-800 rounded transition-colors focus:outline-none bg-transparent"
                  onClick={() => {
                    const roomId = chatRooms.find(room => room.id === activeChatRoom)?.roomId;
                    if (roomId) copyRoomId(roomId);
                  }}
                  title="复制聊天室ID"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
            {/* <div className="flex items-center space-x-4">
              <div className="text-gray-400">
                在线人数：<text style={{ color: 'green' }}>{users.filter(user => user.status === 'online').length} </text>人
              </div>
            </div> */}
          </div>
          
          {/* 主体内容区 */}
          <div className="flex flex-1 overflow-hidden">
            {/* 消息记录区域 */}
            <div className="flex-1 flex flex-col">
              {/* 消息展示区 */}
              <MessageArea messages={messages} users={users} />
            
              {/* 输入控制区 */}
              <div className="border-t border-gray-800 bg-gray-900 p-4">
                {/* 表情面板 */}
                {showEmojiPanel && (
                  <div className="mb-3 p-3 bg-gray-800 rounded-lg">
                    <div className="h-24 overflow-y-auto">
                      <div className="grid grid-cols-12 gap-2">
                        {emojis.map((emoji, index) => (
                          <button
                            key={index}
                            className="text-2xl p-1 hover:bg-gray-700 rounded transition-colors bg-transparent focus:outline-none"
                            onClick={() => addEmoji(emoji)}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* 输入框和按钮 */}
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 text-gray-500 hover:text-gray-300 bg-transparent transition-colors border-0 focus:outline-none"
                    onClick={() => setShowEmojiPanel(!showEmojiPanel)}
                  >
                    <SmileOutlined className="text-xl" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="输入消息..."
                      className="w-full bg-gray-800 text-white rounded-full py-3 px-4 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    />
                  </div>
                  <button
                    className="bg-gray-700 hover:bg-gray-600 text-white p-3 rounded-full transition-colors rounded-button whitespace-nowrap focus:outline-none"
                    onClick={handleSend}
                  >
                    <SendOutlined />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 右侧用户列表面板 */}
        <UserListPanel users={users} />
      </div>
    </div>
  );
};

export default App;
import { type FC } from 'react';
import { Modal } from './Modal';

interface BestTimeSchedulerProps {
  isOpen: boolean;
  onClose: () => void;
  platform: 'youtube' | 'instagram';
}

const BestTimeScheduler: FC<BestTimeSchedulerProps> = ({ isOpen, onClose, platform }) => {
  const youtubeTimes = [
    { day: 'Monday', times: ['2-4 PM', '6-9 PM'], reason: 'After work hours' },
    { day: 'Tuesday', times: ['2-4 PM', '6-9 PM'], reason: 'Peak engagement' },
    { day: 'Wednesday', times: ['2-4 PM', '6-9 PM'], reason: 'Mid-week boost' },
    { day: 'Thursday', times: ['12-3 PM', '7-9 PM'], reason: 'Pre-weekend surge' },
    { day: 'Friday', times: ['12-3 PM', '5-8 PM'], reason: 'Weekend prep' },
    { day: 'Saturday', times: ['9-11 AM', '5-7 PM'], reason: 'Leisure time' },
    { day: 'Sunday', times: ['9-11 AM', '5-7 PM'], reason: 'Weekend relaxation' },
  ];

  const instagramTimes = [
    { day: 'Monday', times: ['6-9 AM', '12-2 PM', '7-9 PM'], reason: 'Commute & breaks' },
    { day: 'Tuesday', times: ['6-9 AM', '12-2 PM', '7-9 PM'], reason: 'High engagement' },
    { day: 'Wednesday', times: ['6-9 AM', '11 AM-1 PM', '7-9 PM'], reason: 'Mid-week peak' },
    { day: 'Thursday', times: ['6-9 AM', '12-2 PM', '7-9 PM'], reason: 'Pre-weekend' },
    { day: 'Friday', times: ['6-9 AM', '1-3 PM', '5-7 PM'], reason: 'TGIF vibes' },
    { day: 'Saturday', times: ['10 AM-1 PM', '7-9 PM'], reason: 'Weekend scrolling' },
    { day: 'Sunday', times: ['10 AM-1 PM', '7-9 PM'], reason: 'Sunday funday' },
  ];

  const times = platform === 'youtube' ? youtubeTimes : instagramTimes;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="📅 Best Time to Post" size="lg">
      <div className="space-y-4">
        {/* Platform Info */}
        <div className={`p-4 rounded-lg border-2 ${
          platform === 'youtube' 
            ? 'bg-red-50 border-red-200' 
            : 'bg-pink-50 border-pink-200'
        }`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl">{platform === 'youtube' ? '🎥' : '📸'}</span>
            <div>
              <h3 className="font-bold text-gray-900 capitalize">{platform} Posting Schedule</h3>
              <p className="text-sm text-gray-600">Optimized for maximum engagement</p>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="space-y-3">
          {times.map((schedule, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg hover:shadow-md transition-all bg-white"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-gray-900">{schedule.day}</span>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {schedule.reason}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {schedule.times.map((time, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg text-sm font-medium"
                      >
                        ⏰ {time}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tips */}
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-bold text-yellow-900 mb-2">💡 Pro Tips:</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Post consistently at the same times</li>
            <li>• Test different time slots for your audience</li>
            <li>• Consider your audience's timezone</li>
            <li>• Schedule posts in advance for consistency</li>
          </ul>
        </div>

        {/* PWA Feature Teaser */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-2 border-purple-200">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🔔</span>
            <div>
              <h4 className="font-bold text-purple-900">Coming Soon: Auto-Scheduler</h4>
              <p className="text-sm text-purple-700">
                Install as PWA to get notifications for best posting times!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default BestTimeScheduler;

        <div className="w-full bg-white rounded-b-[64px] shadow-sm mb-12">
          <div className="w-full max-w-[1218px] mx-auto px-4 md:px-6 pt-8 pb-12">

            {/* --- Top Global Header (Inside White Box) --- */}
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-[28px] font-medium text-[#323232] leading-tight mb-1" style={{ fontFamily: 'Qantas Sans, sans-serif' }}>
                  Good morning, {slot?.name || 'William'}
                </h1>
                {isIntroState && <p className="text-[14px] text-gray-500 font-bold">Let's get started</p>}
              </div>

              {!isIntroState && (
                <div className="flex bg-[#E1F2F2] rounded-full px-4 py-1.5 border border-[#C5EDED]">
                  <span className="text-[13px] font-bold text-[#007A7A]">February Target: {Math.round(totalAnnualPts / 12).toLocaleString()} PTS</span>
                </div>
              )}

              <div className="text-right flex items-center gap-4">
                <button
                  onClick={handleTimePasses}
                  className="text-[#E40000] text-[13px] font-bold hover:underline bg-[#FFEAEA] px-3 py-1.5 rounded-full mr-2 hidden md:block"
                >
                  Time passes
                </button>
                <div className="text-right">
                  <p className="text-[15px] font-bold leading-none">Bronze</p>
                  <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider font-medium">Frequent Flyer 1234 567 890</p>
                </div>
                <div className="w-[48px] h-[48px] bg-[#E40000] rounded-full flex items-center justify-center shadow-md">
                  <img src={PointsRooLogo} alt="" className="w-6 h-6 brightness-0 invert" />
                </div>
              </div>
            </div>

            {/* --- Top Panel Content --- */}
            <div>
              {isIntroState ? (
                <div className="flex flex-col xl:flex-row gap-8 items-center justify-between">
                  {/* Left: Koala Sprite */}
                  <div className="flex-shrink-0 flex items-center justify-center transform scale-90">
                    <KoalaSprite />
                  </div>

                  {/* Middle: Intro Content */}
                  <div className="flex-grow max-w-[400px]">
                    <h2 className="text-[24px] font-medium text-[#323232] mb-3">Let's get you some points</h2>
                    <p className="text-[14px] text-gray-800 leading-relaxed mb-8">
                      One of the best ways to get the most out of your membership is by finding a few different ways of earning points. You can add points to your account homepage.
                    </p>

                    <div className="flex flex-wrap items-center gap-6 mb-4">
                      <button
                        onClick={() => {
                          setDashboardIntroDismissed(true);
                          goTo(3);
                        }}
                        className="bg-[#E40000] text-white px-8 py-3 rounded-[6px] font-bold text-[13px] uppercase tracking-wider hover:bg-red-700 transition-colors shadow-sm"
                      >
                        SHOW ME
                      </button>
                      <button
                        onClick={() => goTo(4)}
                        className="text-[#E40000] text-[13px] font-bold hover:underline"
                      >
                        Choose favorite reward
                      </button>
                    </div>
                    <button
                      onClick={() => setDashboardIntroDismissed(true)}
                      className="text-[12px] text-[#E40000] font-bold hover:underline"
                    >
                      Skip
                    </button>
                  </div>

                  {/* Right: Illustration */}
                  <div className="flex-shrink-0 flex justify-end">
                    <div className="flex items-end gap-6">
                      {/* Step 1: Choose */}
                      <div className="flex flex-col items-center">
                        <div className="w-[120px] h-[120px] bg-[#F7F7F7] rounded-[16px] border border-gray-100 flex items-center justify-center relative shadow-sm mb-3">
                          <div className="w-16 h-10 bg-white rounded-[4px] border border-gray-100 flex items-center justify-center p-2">
                            <div className="w-full h-1 bg-[#E1F2F2] rounded-full" />
                          </div>
                          <div className="absolute top-2 right-2 w-6 h-6 bg-white border border-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-4 h-4 text-[#E40000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <span className="text-[14px] font-medium text-[#323232]">Choose</span>
                      </div>

                      {/* Step 2: Add */}
                      <div className="flex flex-col items-center">
                        <div className="w-[120px] h-[120px] bg-[#F7F7F7] rounded-[16px] border border-gray-100 p-4 flex flex-col justify-center gap-2 relative shadow-sm mb-3">
                          {[1, 2].map(i => (
                            <div key={i} className="bg-white rounded-[4px] border border-gray-100 p-2 flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full border border-[#E40000] flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-[#E40000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                              <div className="h-1.5 w-12 bg-gray-100 rounded-full" />
                            </div>
                          ))}
                        </div>
                        <span className="text-[14px] font-medium text-[#323232]">Add</span>
                      </div>

                      {/* Step 3: Set up */}
                      <div className="flex flex-col items-center">
                        <div className="w-[120px] h-[120px] bg-[#F7F7F7] rounded-[16px] border border-gray-100 flex items-center justify-center relative shadow-sm mb-3">
                          <div className="w-[84px] h-[84px] rounded-full border-4 border-dashed border-[#C5EDED] bg-white flex items-center justify-center" />
                          <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                            <span className="text-[#007A7A] font-bold text-[14px]">+ 50</span>
                            <span className="text-[#007A7A] font-bold text-[10px] uppercase">PTS</span>
                          </div>
                        </div>
                        <span className="text-[14px] font-medium text-[#323232]">Set up</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left: Progress */}
                  <div className="lg:col-span-8">

                    <div className="flex items-center space-x-6 mb-8">
                      <span className="text-[16px] font-medium">February</span>
                      <div className="bg-white border border-gray-200 px-4 py-1.5 rounded-full text-[#323232] text-[13px] font-bold shadow-sm">
                        Target {Math.round(totalAnnualPts / 12).toLocaleString()} PTS
                      </div>
                    </div>

                    {/* Favourite ways to earn */}
                    <div className="lg:col-span-12 mt-4 pt-10 border-t border-gray-100">
                      <h3 className="text-[20px] font-bold mb-8">Favourite ways to earn:</h3>
                      <div className="flex flex-wrap gap-8">
                        {selectedWTEs.map(({ id: stringId }) => {
                          const numericId = Number(stringId);
                          const wte = WTEs.find(w => w.id === numericId);
                          if (!wte) return null;

                          const earned = (current.monthlyEarnedByWTE || {})[numericId] || 0;
                          const target = (current.monthlyTargetByWTE || {})[numericId] || 1;
                          const setupSteps = (current.setupProgressByWTE || {})[numericId] || 0;

                          const percent = earned > 0
                            ? Math.min(100, Math.round((earned / target) * 100))
                            : (setupSteps / 4) * 100;

                          return (
                            <div key={numericId} className="flex flex-col items-center w-[120px]">
                              <span className="text-[12px] font-medium text-center mb-3 h-[32px] flex items-center line-clamp-2">
                                {wte.name}
                              </span>
                              <div className="relative w-[84px] h-[84px] mb-4">
                                {/* Progress Circle */}
                                <svg className="w-full h-full transform -rotate-90">
                                  <circle cx="42" cy="42" r="38" fill="none" stroke="#F3F5F7" strokeWidth="4" />
                                  <circle
                                    cx="42" cy="42" r="38" fill="none"
                                    stroke={earned > 0 ? "#E40000" : "#BCBCBC"}
                                    strokeWidth="4"
                                    strokeDasharray={238.7}
                                    strokeDashoffset={238.7 - (238.7 * percent) / 100}
                                    strokeLinecap="round"
                                    className="transition-all duration-1000"
                                  />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <div className="w-[64px] h-[64px] bg-white rounded-full p-2 flex items-center justify-center shadow-sm">
                                    <img src={wte.iconSrc} alt={wte.name} className="w-full h-full object-contain" />
                                  </div>
                                </div>
                              </div>
                              {earned > 0 ? (
                                <div className="text-center">
                                  <p className="text-[16px] font-bold">+{earned.toLocaleString()}</p>
                                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">PTS</p>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center">
                                  <button
                                    onClick={() => setShowOnboardingId(stringId)}
                                    className="bg-white border border-gray-300 rounded-full px-4 py-1 text-[11px] font-bold hover:border-red-600 hover:text-red-600 transition-colors"
                                  >
                                    Set up
                                  </button>
                                  <span className="text-[10px] text-[#E40000] font-bold mt-1">+50 PTS</span>
                                </div>
                              )}
                            </div>
                          );
                        })}

                        {/* Add New Slot */}
                        <div className="flex flex-col items-center w-[120px]">
                          <span className="text-[12px] font-medium mb-3 h-[32px] flex items-center">Add new</span>
                          <button
                            onClick={() => goTo(3)}
                            className="w-[84px] h-[84px] rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center text-[32px] text-gray-300 hover:border-red-600 hover:text-red-600 hover:bg-red-50 transition-all mb-4"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Target Reward & Profile */}
                  <div className="lg:col-span-4 flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-[#666] uppercase tracking-wider">Target Annual Earn: {totalAnnualPts.toLocaleString()} PTS</span>
                      </div>
                      <button
                        onClick={() => goTo(3)}
                        className="text-[11px] font-bold text-[#E40000] hover:underline"
                      >
                        Edit
                      </button>
                    </div>

                    <p className="text-[11px] font-bold text-[#666] uppercase tracking-wider mb-4">Target reward:</p>

                    <div className="w-full mb-8">
                      {selectedReward ? (
                        <ConnectedRewardCard reward={selectedReward} />
                      ) : (
                        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[24px] aspect-[1.4/1] flex items-center justify-center">
                          <button onClick={() => goTo(4)} className="text-[#E40000] font-bold hover:underline">Select a target reward</button>
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] font-bold text-[#666] uppercase tracking-wider mb-4 flex justify-between items-center">
                      <span>Target tier:</span>
                      <button
                        onClick={() => goTo(3)}
                        className="text-[11px] font-bold text-[#E40000] hover:underline normal-case"
                      >
                        Edit
                      </button>
                    </p>

                    <div className="w-full">
                      <TierCard
                        tierIndex={favouriteTierIndex !== null ? favouriteTierIndex : flightTierIndex}
                        isFavourite={favouriteTierIndex !== null}
                        onToggleFavourite={() => {
                          if (favouriteTierIndex !== null) {
                            updateFavouriteTierIndex(null);
                          } else {
                            updateFavouriteTierIndex(flightTierIndex);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <main className="w-full max-w-[1218px] mx-auto px-4 md:px-6 py-4 mb-8 flex-grow">
          {/* --- Lower Content (Sitting on Grey) --- */}

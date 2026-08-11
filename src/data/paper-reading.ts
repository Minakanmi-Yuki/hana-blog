export type PaperReadingLink = {
  type: 'website' | 'github' | 'model' | 'dataset'
  href: string
}

export type PaperReadingMetadata = {
  publication?: string
  links?: PaperReadingLink[]
}

/**
 * Curated links and publication updates for the paper-reading cards.
 * IDs are normalized to the arXiv base ID so different versions share metadata.
 */
export const paperReadingMetadata: Record<string, PaperReadingMetadata> = {
  // Benchmark and representation learning
  '2006.11239': { links: [{ type: 'github', href: 'https://github.com/hojonathanho/diffusion' }] },
  '1512.03385': {
    links: [{ type: 'github', href: 'https://github.com/KaimingHe/deep-residual-networks' }]
  },
  '1409.1556': {
    links: [{ type: 'website', href: 'https://www.robots.ox.ac.uk/~vgg/research/very_deep/' }]
  },
  '2010.11929': {
    links: [
      { type: 'github', href: 'https://github.com/google-research/vision_transformer' },
      { type: 'model', href: 'https://huggingface.co/google/vit-base-patch16-224' }
    ]
  },
  '2111.06377': { links: [{ type: 'github', href: 'https://github.com/facebookresearch/mae' }] },
  '2104.14294': { links: [{ type: 'github', href: 'https://github.com/facebookresearch/dino' }] },
  '2304.07193': {
    publication: 'TMLR2024',
    links: [
      { type: 'github', href: 'https://github.com/facebookresearch/dinov2' },
      { type: 'model', href: 'https://huggingface.co/facebook/dinov2-base' }
    ]
  },
  '2508.10104': { links: [{ type: 'github', href: 'https://github.com/facebookresearch/dinov3' }] },
  '2303.05499': {
    links: [{ type: 'github', href: 'https://github.com/IDEA-Research/GroundingDINO' }]
  },
  '2304.02643': {
    links: [
      { type: 'website', href: 'https://segment-anything.com' },
      { type: 'github', href: 'https://github.com/facebookresearch/segment-anything' }
    ]
  },
  '2408.00714': {
    links: [
      { type: 'website', href: 'https://ai.meta.com/sam2' },
      { type: 'github', href: 'https://github.com/facebookresearch/sam2' }
    ]
  },
  '2511.16719': {
    links: [{ type: 'website', href: 'https://ai.meta.com/sam3' }]
  },
  '2511.16624': {
    links: [
      { type: 'website', href: 'https://ai.meta.com/sam3d/' },
      { type: 'github', href: 'https://github.com/facebookresearch/sam-3d-objects' }
    ]
  },
  '1612.00593': { links: [{ type: 'github', href: 'https://github.com/charlesq34/pointnet' }] },
  '1706.02413': { links: [{ type: 'github', href: 'https://github.com/charlesq34/pointnet2' }] },
  '2111.14819': { links: [{ type: 'github', href: 'https://github.com/Julie-tang00/Point-BERT' }] },
  '2203.06604': { links: [{ type: 'github', href: 'https://github.com/Pang-Yatian/Point-MAE' }] },
  '2305.11487': { links: [{ type: 'github', href: 'https://github.com/CGuangyan-BIT/PointGPT' }] },
  '2012.09164': {
    links: [{ type: 'github', href: 'https://github.com/POSTECH-CVLab/point-transformer' }]
  },
  '2210.05666': {
    links: [{ type: 'github', href: 'https://github.com/Pointcept/PointTransformerV2' }]
  },
  '2312.10035': {
    links: [{ type: 'github', href: 'https://github.com/Pointcept/PointTransformerV3' }]
  },
  '2309.00615': {
    links: [{ type: 'github', href: 'https://github.com/ZiyuGuo99/Point-Bind_Point-LLM' }]
  },
  '2211.15654': {
    links: [
      { type: 'website', href: 'https://pengsongyou.github.io/openscene' },
      { type: 'github', href: 'https://github.com/pengsongyou/openscene' }
    ]
  },
  '2306.13631': {
    links: [
      { type: 'website', href: 'https://openmask3d.github.io/' },
      { type: 'github', href: 'https://github.com/OpenMask3D/OpenMask3D' }
    ]
  },
  '2503.11651': {
    links: [
      { type: 'website', href: 'https://vgg-t.github.io/' },
      { type: 'github', href: 'https://github.com/facebookresearch/vggt' },
      { type: 'model', href: 'https://huggingface.co/facebook/VGGT-1B' }
    ]
  },
  '2312.14132': { links: [{ type: 'github', href: 'https://github.com/naver/dust3r' }] },
  '2406.09756': { links: [{ type: 'github', href: 'https://github.com/naver/mast3r' }] },
  '2408.16061': {
    links: [{ type: 'website', href: 'https://hengyiwang.github.io/projects/spanner' }]
  },
  '2410.03825': {
    links: [
      { type: 'website', href: 'https://monst3r-project.github.io/' },
      { type: 'github', href: 'https://github.com/Junyi42/monst3r' }
    ]
  },
  '2501.12387': { links: [{ type: 'github', href: 'https://github.com/CUT3R/CUT3R' }] },
  '2308.04079': {
    links: [
      { type: 'website', href: 'https://repo-sam.inria.fr/fungraph/3d-gaussian-splatting/' },
      { type: 'github', href: 'https://github.com/graphdeco-inria/gaussian-splatting' }
    ]
  },
  '2401.10891': {
    links: [
      { type: 'website', href: 'https://depth-anything.github.io/' },
      { type: 'github', href: 'https://github.com/LiheYoung/Depth-Anything' }
    ]
  },
  '2406.09414': {
    links: [
      { type: 'website', href: 'https://depth-anything-v2.github.io/' },
      { type: 'github', href: 'https://github.com/DepthAnything/Depth-Anything-V2' }
    ]
  },
  '2511.10647': {
    links: [{ type: 'website', href: 'https://depth-anything-3.github.io/' }]
  },
  '2501.12375': { links: [{ type: 'website', href: 'https://videodepthanything.github.io/' }] },
  '2404.15506': {
    publication: 'TPAMI2024',
    links: [
      { type: 'website', href: 'https://jugghm.github.io/Metric3Dv2' },
      { type: 'github', href: 'https://github.com/YvanYin/Metric3D' }
    ]
  },
  '2403.18913': {
    links: [{ type: 'github', href: 'https://github.com/lpiccinelli-eth/UniDepth' }]
  },
  '2410.19115': { links: [{ type: 'website', href: 'https://wangrc.site/MoGePage/' }] },
  '2501.09898': { links: [{ type: 'github', href: 'https://github.com/NVlabs/FoundationStereo' }] },
  '2311.06242': {
    links: [{ type: 'model', href: 'https://huggingface.co/microsoft/Florence-2-large' }]
  },
  '2401.17270': { links: [{ type: 'github', href: 'https://github.com/AILab-CVC/YOLO-World' }] },
  '2405.10300': { links: [{ type: 'website', href: 'https://deepdataspace.com/' }] },
  '2205.06230': {
    links: [{ type: 'model', href: 'https://huggingface.co/google/owlvit-base-patch32' }]
  },
  '2112.03857': { links: [{ type: 'github', href: 'https://github.com/microsoft/GLIP' }] },
  '2304.06718': {
    links: [
      {
        type: 'github',
        href: 'https://github.com/UX-Decoder/Segment-Everything-Everywhere-All-At-Once'
      }
    ]
  },
  '2212.11270': { links: [{ type: 'website', href: 'https://x-decoder-vl.github.io/' }] },
  '2408.12569': {
    links: [{ type: 'github', href: 'https://github.com/facebookresearch/sapiens' }]
  },
  '2211.05778': { links: [{ type: 'github', href: 'https://github.com/OpenGVLab/InternImage' }] },
  '2404.08471': { links: [{ type: 'github', href: 'https://github.com/facebookresearch/jepa' }] },

  // Embodied AI
  '2304.13705': { links: [{ type: 'github', href: 'https://github.com/tonyzhaozh/act' }] },
  '2303.04137': {
    links: [{ type: 'github', href: 'https://github.com/real-stanford/diffusion_policy' }]
  },
  '2212.06817': {
    links: [
      { type: 'website', href: 'https://robotics-transformer1.github.io/' },
      { type: 'github', href: 'https://github.com/google-research/robotics_transformer' }
    ]
  },
  '2307.15818': { links: [{ type: 'website', href: 'https://robotics-transformer.github.io/' }] },
  '2406.09246': {
    links: [
      { type: 'website', href: 'https://openvla.github.io/' },
      { type: 'github', href: 'https://github.com/openvla/openvla' },
      { type: 'model', href: 'https://huggingface.co/openvla/openvla-7b' }
    ]
  },
  '2310.08864': { links: [{ type: 'website', href: 'https://robotics-transformer-x.github.io/' }] },
  '2503.00200': {
    links: [{ type: 'website', href: 'https://unified-video-action-model.github.io/' }]
  },
  '2508.05635': { links: [{ type: 'website', href: 'https://genie-envisioner.github.io/' }] },
  '2411.19650': { links: [{ type: 'website', href: 'https://cogact.github.io/' }] },
  '2410.24164': {
    publication: 'RSS2025',
    links: [
      { type: 'website', href: 'https://www.physicalintelligence.company/blog/pi0' },
      { type: 'github', href: 'https://github.com/Physical-Intelligence/openpi' },
      { type: 'model', href: 'https://huggingface.co/lerobot/pi0' }
    ]
  },
  '2504.16054': {
    publication: 'RSS2025',
    links: [
      { type: 'website', href: 'https://www.physicalintelligence.company/blog/pi05' },
      { type: 'github', href: 'https://github.com/Physical-Intelligence/openpi' }
    ]
  },
  '2507.15493': { links: [{ type: 'website', href: 'https://seed.bytedance.com/GR3/' }] },
  '2506.01953': { links: [{ type: 'website', href: 'https://fast-in-slow.github.io/' }] },
  '2210.03094': {
    publication: 'ICML2023',
    links: [
      { type: 'website', href: 'https://vimalabs.github.io/' },
      { type: 'github', href: 'https://github.com/vimalabs/vima' }
    ]
  },
  '2204.01691': { links: [{ type: 'website', href: 'https://say-can.github.io/' }] },
  '2303.03378': { links: [{ type: 'website', href: 'https://palm-e.github.io/' }] },
  '2307.05973': {
    links: [
      { type: 'website', href: 'https://voxposer.github.io/' },
      { type: 'github', href: 'https://github.com/huangwl18/VoxPoser' }
    ]
  },
  '2311.01977': { links: [{ type: 'website', href: 'https://rt-trajectory.github.io/' }] },
  '2407.08693': { links: [{ type: 'website', href: 'https://embodied-cot.github.io/' }] },
  '2209.07753': {
    links: [
      {
        type: 'github',
        href: 'https://github.com/google-research/google-research/tree/master/code_as_policies'
      }
    ]
  },
  '2406.10721': { links: [{ type: 'github', href: 'https://github.com/wentaoyuan/RoboPoint' }] },
  '2312.13139': { links: [{ type: 'website', href: 'https://gr1-manipulation.github.io/' }] },
  '2409.20537': { links: [{ type: 'website', href: 'https://liruiw.github.io/hpt/' }] },
  '2410.08001': { links: [{ type: 'website', href: 'https://opendrivelab.com/RoboDual/' }] },
  '2410.06158': { links: [{ type: 'website', href: 'https://gr2-manipulation.github.io/' }] },
  '2410.10803': { links: [{ type: 'website', href: 'https://humanoid-manipulation.github.io/' }] },
  '2410.01702': {
    publication: 'ICRA2025',
    links: [{ type: 'website', href: 'https://nus-lins-lab.github.io/drograspweb/' }]
  },
  '2409.18121': { links: [{ type: 'website', href: 'https://robot-see-robot-do.github.io/' }] },
  '2409.01652': { links: [{ type: 'github', href: 'https://github.com/huangwl18/ReKep' }] },
  '2502.16932': { links: [{ type: 'website', href: 'https://demo-generation.github.io/' }] },
  '2410.11758': {
    links: [{ type: 'website', href: 'https://latentactionpretraining.github.io/' }]
  },
  '2503.14734': {
    links: [
      { type: 'website', href: 'https://developer.nvidia.com/isaac/gr00t' },
      { type: 'github', href: 'https://github.com/NVIDIA/Isaac-GR00T' },
      { type: 'model', href: 'https://huggingface.co/nvidia/GR00T-N1.5-3B' }
    ]
  },
  'https://roboverseorg.github.io/static/pdfs/roboverse.pdf': {
    links: [
      { type: 'website', href: 'https://roboverseorg.github.io/' },
      { type: 'github', href: 'https://github.com/RoboVerseOrg/RoboVerse' },
      { type: 'dataset', href: 'https://huggingface.co/datasets/RoboVerseOrg/roboverse_data' }
    ]
  },
  '2503.06669': {
    links: [
      { type: 'website', href: 'https://agibot-world.com/' },
      { type: 'github', href: 'https://github.com/OpenDriveLab/AgiBot-World' },
      { type: 'dataset', href: 'https://huggingface.co/datasets/agibot-world/AgiBotWorld-Alpha' }
    ]
  },
  '2505.06111': {
    publication: 'RSS2025',
    links: [{ type: 'github', href: 'https://github.com/OpenDriveLab/UniVLA' }]
  },
  '2411.19309': { links: [{ type: 'website', href: 'https://grape-vla.github.io/' }] },
  '2410.07864': {
    links: [{ type: 'github', href: 'https://github.com/thu-ml/RoboticsDiffusionTransformer' }]
  },
  '2405.12213': {
    links: [
      { type: 'website', href: 'https://octo-models.github.io/' },
      { type: 'github', href: 'https://github.com/octo-models/octo' },
      { type: 'model', href: 'https://huggingface.co/rail-berkeley/octo-small-1.5' }
    ]
  },
  '2501.09747': {
    links: [{ type: 'website', href: 'https://www.pi.website/research/fast' }]
  },
  '2505.08712': {
    links: [
      { type: 'website', href: 'https://wzcai99.github.io/navigation-diffusion-policy.github.io/' }
    ]
  },
  '2505.21906': { links: [{ type: 'website', href: 'https://chatvla-2.github.io/' }] },
  '2503.22020': { links: [{ type: 'website', href: 'https://cot-vla.github.io/' }] },
  '2507.16815': {
    publication: 'NeurIPS2025',
    links: [{ type: 'website', href: 'https://jasper0314-huang.github.io/thinkact-vla/' }]
  },
  '2502.13143': {
    publication: 'NeurIPS2025'
  },
  '2410.10394': { publication: 'NeurIPS2024' },
  '2503.03045': { publication: 'RSS2025' },
  '2508.02062': { publication: 'CoRL2025' },
  '2501.15830': {
    publication: 'RSS2025',
    links: [{ type: 'website', href: 'https://spatialvla.github.io/' }]
  },
  '2507.05240': { publication: 'ICRA2026' },
  '2508.08706': {
    publication: 'RA-L',
    links: [{ type: 'website', href: 'https://readerek.github.io/Objtac.github.io/' }]
  },
  '2506.09985': { links: [{ type: 'github', href: 'https://github.com/facebookresearch/vjepa2' }] },
  '2506.01844': {
    links: [
      { type: 'github', href: 'https://github.com/huggingface/lerobot' },
      { type: 'model', href: 'https://huggingface.co/lerobot/smolvla_base' }
    ]
  },
  '2508.07917': { links: [{ type: 'github', href: 'https://github.com/allenai/molmoact' }] },
  '2310.17596': { links: [{ type: 'github', href: 'https://github.com/NVlabs/mimicgen' }] },
  '2506.04308': {
    publication: 'NeurIPS2025',
    links: [{ type: 'website', href: 'https://zhoues.github.io/RoboRefer/' }]
  },
  '2508.13998': { publication: 'ICLR2026' },
  '2508.20072': { publication: 'ICML2026' },
  '2509.00576': { links: [{ type: 'website', href: 'https://opengalaxea.github.io/G0/' }] },
  '2509.10813': {
    publication: 'NeurIPS2025',
    links: [
      { type: 'website', href: 'https://marjordcpz.github.io/InternScenes.github.io/' },
      { type: 'dataset', href: 'https://huggingface.co/datasets/InternRobotics/InternScenes' }
    ]
  },
  'https://openaccess.thecvf.com/content_CVPR_2020/papers/Fang_GraspNet-1Billion_A_Large-Scale_Benchmark_for_General_Object_Grasping_CVPR_2020_paper.pdf':
    {
      links: [
        { type: 'website', href: 'https://graspnet.net/' },
        { type: 'github', href: 'https://github.com/graspnet/graspnet-baseline' }
      ]
    },
  'https://journals.sagepub.com/doi/10.1177/02783649231193710': {
    links: [
      { type: 'website', href: 'https://graspnet.net/' },
      { type: 'github', href: 'https://github.com/graspnet/graspnet-baseline' }
    ]
  },
  '1809.06267': {
    links: [{ type: 'github', href: 'https://github.com/lianghongzhuo/PointNetGPD' }]
  },
  '2212.08333': { links: [{ type: 'website', href: 'https://graspnet.net/anygrasp.html' }] },
  '2308.16911': {
    links: [
      { type: 'website', href: 'https://runsenxu.com/projects/PointLLM' },
      { type: 'dataset', href: 'https://huggingface.co/datasets/RunsenXu/PointLLM' }
    ]
  },
  '1910.14218': { links: [{ type: 'website', href: 'https://sites.google.com/view/s4ggrapsing' }] },

  // Language models
  '1810.04805': {
    links: [
      { type: 'github', href: 'https://github.com/google-research/bert' },
      { type: 'model', href: 'https://huggingface.co/google-bert/bert-base-uncased' }
    ]
  },
  'https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf':
    {
      links: [
        { type: 'website', href: 'https://openai.com/research/better-language-models' },
        { type: 'github', href: 'https://github.com/openai/gpt-2' },
        { type: 'model', href: 'https://huggingface.co/openai-community/gpt2' }
      ]
    },
  '1909.08053': { links: [{ type: 'github', href: 'https://github.com/NVIDIA/Megatron-LM' }] },
  '1910.10683': {
    links: [
      {
        type: 'github',
        href: 'https://github.com/google-research/text-to-text-transfer-transformer'
      },
      { type: 'model', href: 'https://huggingface.co/google-t5/t5-base' }
    ]
  },
  '1910.02054': { links: [{ type: 'github', href: 'https://github.com/microsoft/DeepSpeed' }] },
  '2101.03961': { links: [{ type: 'github', href: 'https://github.com/google-research/t5x' }] },
  '2201.11903': {
    links: [{ type: 'github', href: 'https://github.com/princeton-nlp/Tree-of-Thought-LLM' }]
  },
  '2302.13971': { links: [{ type: 'github', href: 'https://github.com/facebookresearch/llama' }] },
  '2305.18290': { links: [{ type: 'github', href: 'https://github.com/huggingface/trl' }] },
  '2305.10601': {
    links: [{ type: 'github', href: 'https://github.com/princeton-nlp/tree-of-thought-llm' }]
  },
  '2307.09288': {
    links: [
      { type: 'github', href: 'https://github.com/meta-llama/llama' },
      { type: 'model', href: 'https://huggingface.co/meta-llama/Llama-2-7b-hf' }
    ]
  },
  '2310.06825': {
    links: [
      { type: 'website', href: 'https://mistral.ai/news/announcing-mistral-7b/' },
      { type: 'model', href: 'https://huggingface.co/mistralai/Mistral-7B-v0.1' }
    ]
  },
  '2312.00752': {
    publication: 'COLM2024',
    links: [
      { type: 'github', href: 'https://github.com/state-spaces/mamba' },
      { type: 'model', href: 'https://huggingface.co/state-spaces/mamba-130m-hf' }
    ]
  },
  '2405.21060': { links: [{ type: 'github', href: 'https://github.com/state-spaces/mamba' }] },
  '2412.15115': {
    links: [
      { type: 'github', href: 'https://github.com/QwenLM/Qwen2.5' },
      { type: 'model', href: 'https://huggingface.co/Qwen/Qwen2.5-7B' }
    ]
  },
  '2412.19437': {
    links: [
      { type: 'github', href: 'https://github.com/deepseek-ai/DeepSeek-V3' },
      { type: 'model', href: 'https://huggingface.co/deepseek-ai/DeepSeek-V3' }
    ]
  },
  '2501.12948': {
    publication: 'Nature2025',
    links: [
      { type: 'github', href: 'https://github.com/deepseek-ai/DeepSeek-R1' },
      { type: 'model', href: 'https://huggingface.co/deepseek-ai/DeepSeek-R1' }
    ]
  },
  '2507.20534': {
    links: [
      { type: 'github', href: 'https://github.com/MoonshotAI/Kimi-K2' },
      { type: 'model', href: 'https://huggingface.co/moonshotai/Kimi-K2-Instruct' }
    ]
  },
  '2508.05629': { publication: 'ICLR2026' },
  '2505.15809': {
    publication: 'NeurIPS2025',
    links: [{ type: 'github', href: 'https://github.com/Gen-Verse/MMaDA' }]
  },

  // Multi-agent reinforcement learning
  '1706.05296': { links: [{ type: 'github', href: 'https://github.com/oxwhirl/pymarl' }] },
  '1803.11485': { links: [{ type: 'github', href: 'https://github.com/oxwhirl/pymarl' }] },
  '2002.03939': { links: [{ type: 'github', href: 'https://github.com/oxwhirl/pymarl' }] },
  '1905.05408': { links: [{ type: 'github', href: 'https://github.com/oxwhirl/pymarl' }] },
  '2008.01062': { links: [{ type: 'github', href: 'https://github.com/wjh720/QPLEX' }] },
  '1910.07483': { links: [{ type: 'github', href: 'https://github.com/oxwhirl/pymarl' }] },
  '2109.11251': { links: [{ type: 'github', href: 'https://github.com/marlbenchmark/on-policy' }] },
  '2205.14953': { links: [{ type: 'github', href: 'https://github.com/marlbenchmark/on-policy' }] },
  '2205.15245': {
    publication: 'IEEE TNNLS',
    links: [{ type: 'github', href: 'https://github.com/oxwhirl/pymarl' }]
  },

  // Multimodal language models
  '2103.00020': {
    links: [
      { type: 'website', href: 'https://openai.com/research/clip' },
      { type: 'github', href: 'https://github.com/openai/CLIP' },
      { type: 'model', href: 'https://huggingface.co/openai/clip-vit-base-patch32' }
    ]
  },
  '2303.15343': {
    links: [
      { type: 'github', href: 'https://github.com/google-research/big_vision' },
      { type: 'model', href: 'https://huggingface.co/google/siglip-base-patch16-224' }
    ]
  },
  '2502.14786': {
    links: [
      { type: 'github', href: 'https://github.com/google-research/big_vision' },
      { type: 'model', href: 'https://huggingface.co/google/siglip2-base-patch16-224' }
    ]
  },
  '2102.03334': {
    links: [
      { type: 'github', href: 'https://github.com/dandelin/ViLT' },
      { type: 'model', href: 'https://huggingface.co/dandelin/vilt-b32-mlm' }
    ]
  },
  '2107.07651': {
    links: [
      { type: 'github', href: 'https://github.com/salesforce/ALBEF' },
      { type: 'model', href: 'https://huggingface.co/Salesforce/albef-vqa-base' }
    ]
  },
  '2111.02358': { publication: 'NeurIPS2022' },
  '2201.12086': {
    links: [
      { type: 'github', href: 'https://github.com/salesforce/BLIP' },
      { type: 'model', href: 'https://huggingface.co/Salesforce/blip-image-captioning-base' }
    ]
  },
  '2205.01917': { publication: 'TMLR2022' },
  '2208.10442': {
    links: [
      { type: 'github', href: 'https://github.com/microsoft/unilm' },
      { type: 'model', href: 'https://huggingface.co/microsoft/beit-3-base' }
    ]
  },
  '2301.12597': {
    links: [
      { type: 'github', href: 'https://github.com/salesforce/LAVIS' },
      { type: 'model', href: 'https://huggingface.co/Salesforce/blip2-opt-2.7b' }
    ]
  },
  '2304.08485': {
    links: [
      { type: 'website', href: 'https://llava-vl.github.io/' },
      { type: 'github', href: 'https://github.com/haotian-liu/LLaVA' },
      { type: 'model', href: 'https://huggingface.co/llava-hf/llava-1.5-7b-hf' }
    ]
  },
  '2308.12966': {
    links: [
      { type: 'github', href: 'https://github.com/QwenLM/Qwen-VL' },
      { type: 'model', href: 'https://huggingface.co/Qwen/Qwen-VL-Chat' }
    ]
  },
  '2308.00692': { links: [{ type: 'github', href: 'https://github.com/dvlab-research/LISA' }] },
  '2406.16860': {
    links: [
      { type: 'website', href: 'https://cambrian-mllm.github.io/' },
      { type: 'github', href: 'https://github.com/cambrian-mllm/cambrian' }
    ]
  },
  '2409.12191': {
    links: [
      { type: 'github', href: 'https://github.com/QwenLM/Qwen2-VL' },
      { type: 'model', href: 'https://huggingface.co/Qwen/Qwen2-VL-7B-Instruct' }
    ]
  },
  '2502.13923': {
    links: [
      { type: 'github', href: 'https://github.com/QwenLM/Qwen2.5-VL' },
      { type: 'model', href: 'https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct' }
    ]
  },
  '2305.06500': {
    links: [
      { type: 'github', href: 'https://github.com/salesforce/LAVIS' },
      { type: 'model', href: 'https://huggingface.co/Salesforce/instructblip-vicuna-7b' }
    ]
  },
  '2303.16199': {
    publication: 'ICLR2024',
    links: [{ type: 'github', href: 'https://github.com/OpenGVLab/LLaMA-Adapter' }]
  },
  '2305.11175': { links: [{ type: 'github', href: 'https://github.com/OpenGVLab/VisionLLM' }] },
  '2408.03326': {
    links: [
      { type: 'website', href: 'https://llava-vl.github.io/blog/2024-08-05-llava-onevision/' },
      { type: 'github', href: 'https://github.com/LLaVA-VL/LLaVA-NeXT' },
      { type: 'model', href: 'https://huggingface.co/llava-hf/llava-onevision-qwen2-7b-ov-hf' }
    ]
  },

  // Unified multimodal models
  '2307.08041': { links: [{ type: 'github', href: 'https://github.com/AILab-CVC/SEED' }] },
  '2309.04669': { links: [{ type: 'github', href: 'https://github.com/jy0205/LaVIT' }] },
  '2404.14396': { links: [{ type: 'github', href: 'https://github.com/AILab-CVC/SEED-X' }] },
  '2307.05222': { links: [{ type: 'github', href: 'https://github.com/baaivision/Emu' }] },
  '2312.13286': { links: [{ type: 'website', href: 'https://baaivision.github.io/emu2' }] },
  '2405.09818': {
    links: [{ type: 'github', href: 'https://github.com/facebookresearch/chameleon' }]
  },
  '2409.18869': {
    links: [
      { type: 'website', href: 'https://emu.baai.ac.cn/' },
      { type: 'github', href: 'https://github.com/baaivision/Emu3' }
    ]
  },
  '2410.13848': {
    links: [
      { type: 'github', href: 'https://github.com/deepseek-ai/Janus' },
      { type: 'model', href: 'https://huggingface.co/deepseek-ai/Janus-1.3B' }
    ]
  },
  '2410.13861': { links: [{ type: 'website', href: 'https://rongyaofang.github.io/puma/' }] },
  '2408.12528': {
    publication: 'ICLR2025',
    links: [{ type: 'github', href: 'https://github.com/showlab/Show-o' }]
  },
  '2409.04429': { links: [{ type: 'github', href: 'https://github.com/mit-han-lab/vila-u' }] },
  '2409.17692': { links: [{ type: 'github', href: 'https://github.com/MIO-Team/MIO' }] },
  '2411.07975': { links: [{ type: 'github', href: 'https://github.com/deepseek-ai/Janus' }] },
  '2412.03069': { links: [{ type: 'github', href: 'https://github.com/ByteVisionLab/TokenFlow' }] },
  '2412.04332': {
    links: [{ type: 'website', href: 'https://foundationvision.github.io/Liquid/' }]
  },
  '2412.05818': { links: [{ type: 'website', href: 'https://silmm.github.io/' }] },
  '2412.14164': { links: [{ type: 'website', href: 'https://tsb0601.github.io/metamorph' }] },
  '2501.17811': {
    links: [
      { type: 'github', href: 'https://github.com/deepseek-ai/Janus' },
      { type: 'model', href: 'https://huggingface.co/deepseek-ai/Janus-Pro-7B' }
    ]
  },
  '2504.04423': { publication: 'CVPR2025 Workshop' },
  '2506.15564': {
    publication: 'NeurIPS2025',
    links: [{ type: 'github', href: 'https://github.com/showlab/Show-o' }]
  },
  '2508.02324': {
    links: [
      { type: 'github', href: 'https://github.com/QwenLM/Qwen-Image' },
      { type: 'model', href: 'https://huggingface.co/Qwen/Qwen-Image' }
    ]
  }
}
